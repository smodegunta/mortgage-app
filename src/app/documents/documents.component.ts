import { Component, OnInit, Input } from '@angular/core';
import { QuoteService } from '@app/providers/quote.service';
import { finalize, switchMap, map, take, filter } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const URL = 'path_to_api';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  private redirectUrl: string;

  private isESignAPIReady: boolean = false;
  private loanId: any;

  public isLoading: boolean = false;
  public eSigned: boolean = false;
  public documents: any;
  // public coborrower: boolean = false;
  // public borrowerESigned: boolean = false;
  // public coborrowerESigned: boolean = false;
  private response: any;

  public borrower: any;
  public coBorrower: any;

  constructor (private quoteService: QuoteService, private route: ActivatedRoute) {}


  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.loanId = params.get('loanId');
        this.polleSignAPI();
    });

    
  }
  
  getDocuments() {
    this.isLoading = true;
    this.quoteService.getDocuments({loanId: this.loanId, emailId: '' })
    .pipe(finalize(() => { this.isLoading = false; }))
    .subscribe((response: any) => {
      this.documents = response.documents;
      // this.polleSignAPI(LOAN_ID, response.borrower.email);
    });
  }

  polleSignAPI() {
    interval(2000)
      .pipe(
        switchMap(() => this.quoteService.getDocuments({loanId: this.loanId, emailId: '' })),
        filter((x: any) => x.id),
        take(1),
        map((x) => x)
      ).subscribe((response: any) => { 
        this.isESignAPIReady = true;
        this.response = response;
        for(let element of response.borrowers) {
          if(element['type'] == "CoBorrower") this.coBorrower = element;
          else if(element['type'] == "Borrower") this.borrower = element;
        }
        
        this.documents = response.documents;
      });
  }


  redirectToDocuSign(borrower: Object) {
      this.quoteService.getESignUrl({
        loanId: this.loanId, 
        email: borrower['email'], 
        firstName: borrower['name'].split(' ')[0],
        lastName: borrower['name'].split(' ')[1],
        envelopId: ''
      })
      .subscribe((response: any) => {
        window.location.href = response.viewUrl;
      });
  }
}

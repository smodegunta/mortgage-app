import { Component, OnInit, Input } from '@angular/core';
import { QuoteService } from '@app/providers/quote.service';
import { finalize, switchMap, map, take, filter } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const URL = 'path_to_api';

const LOAN_ID = '6dec4a53-2013-4e68-a4f3-464edf9ce954';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  private redirectUrl: string;

  private isESignAPIReady: boolean = false;
  public isLoading: boolean = false;
  public eSigned: boolean = false;
  public documents: any;

  constructor (private quoteService: QuoteService, private route: ActivatedRoute) {}


  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.eSigned = params.esigned;
        if (!this.eSigned) this.getDocuments();
        else this.updatedESigned();
      });
  }
  
  updatedESigned() {
    this.quoteService.updateEsignedData({loanId: LOAN_ID, emailId: ''})
    .subscribe(() => {});
  }
  
  getDocuments() {
    this.isLoading = true;
    this.quoteService.getDocuments({loanId: LOAN_ID, emailId: '' })
    .pipe(finalize(() => { this.isLoading = false; }))
    .subscribe((response: any) => {
      this.documents = response.documents;
      this.polleSignAPI(LOAN_ID, response.borrower.email);
    });
  }

  polleSignAPI(loanId: string, email: string) {
    interval(2000)
      .pipe(
        switchMap(() => this.quoteService.getESignUrl({loanId: loanId, emailId: email })),
        filter((x: any) => x.viewUrl),
        take(1),
        map((x) => x)
      ).subscribe((response: any) => { 
        console.log(response);
        this.isESignAPIReady = true;
        this.redirectUrl = response.viewUrl; 
      });

  }


  redirectToDocuSign() {
    window.location.href = this.redirectUrl;
  }
}

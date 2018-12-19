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

  // public borrower: any;
  // public coBorrower: any;
  // public docType: string;
  public docsSets: any;

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
      this.docsSets = response.docsSets;
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
        this.docsSets = response.docsSets;
      });
  }

  filterSignableDocuments(docs: any[]) {
      return docs.filter(docu => docu.signatureType==="eSignable");
  }

  signStatus(signers: any[]){
    return signers.map(signer => signer.eSigned).reduce((ss1, ss2)=>ss1&ss2);
  }


  redirectToDocuSign(borrower: Object) {
      
        window.location.href = borrower['url'];
      
  }
}

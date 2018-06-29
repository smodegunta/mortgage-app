import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  loanDetails: (c: LoanContext) =>
  `borrower/loan/${c.loanId}`,
  eSign: (c: eSignContext) =>
  `borrower/loan/${c.loanId}/actionSign/${c.documentId}/attachments/${c.attachmentId}`
};


export interface LoanContext {
  // The quote's category: 'dev', 'explicit'...
  loanId: string;
}

export interface eSignContext {
  loanId: string;
  documentId: string;
  attachmentId: string;
}

@Injectable()
export class QuoteService {

  constructor(private httpClient: HttpClient) { }

  getLoanDetails(context: LoanContext): Observable<string> {
    return this.httpClient
      .cache()
      .get(routes.loanDetails(context))
      .pipe(
        map((body: any) => body.value),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  eSignDocument(context: eSignContext): Observable<string> {
    return this.httpClient
      .cache()
      .get(routes.eSign(context))
      .pipe(
        map((body: any) => body.viewUrl),
        catchError(() => of('Could not eSign'))
      );
  }



}

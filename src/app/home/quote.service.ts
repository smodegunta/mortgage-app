import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  loanDetails: (c: LoanContext) =>
  `borrower/loan/${c.loanId}`,

  actionItems: (c: LoanContext) =>
  `borrower/loan/${c.loanId}/actionItems?emailId=${c.emailId}`,

  eSign: (c: ESignContext) =>
  `borrower/loan/${c.loanId}/actionSign/${c.documentId}/attachments/${c.attachmentId}`
};

export interface LoanContext {
  // The quote's category: 'dev', 'explicit'...
  loanId: string;
  emailId: string;
}
export interface ESignContext {
  loanId: string;
  documentId: string;
  attachmentId: string;
}

@Injectable()
export class QuoteService {

  constructor(private httpClient: HttpClient) { }

  getLoanDetails(context: LoanContext): Observable<string> {
    return this.httpClient
      .get(routes.loanDetails(context))
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  getActionItems(context: LoanContext): Observable<string> {
    return this.httpClient
      .get(routes.actionItems(context))
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  eSignDocument(context: ESignContext): Observable<string> {
    return this.httpClient
      .cache()
      .get(routes.eSign(context))
      .pipe(
        map((body: any) => body.viewUrl),
        catchError(() => of('Could not eSign'))
      );
  }

  submitESign(context: ESignContext): Observable<string> {
    return this.httpClient
      .cache()
      .put(routes.eSign(context), {})
      .pipe(
        map((body: any) => body.viewUrl),
        catchError(() => of('Could not eSign'))
      );
  }

}

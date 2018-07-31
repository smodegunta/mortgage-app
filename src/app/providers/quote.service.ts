import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  loans: () =>
  `borrower/loan/listLoans`,

  documents: (c: LoanContext) =>
  `borrower/loan/${c.loanId}/documents`,

  eSignUrl: (c: ESignUrlContext) =>
  `borrower/loan/${c.loanId}/documents/esignUrl?emailId=${c.emailId}&name=${c.name}`,

  updateSigned: () => 
  `borrower/loan/updateSignedDocs`,

  loanDetails: (c: LoanContext) =>
  `borrower/loan/${c.loanId}`,

  actionItems: (c: LoanContext) =>
  `borrower/loan/${c.loanId}/actionItems?emailId=${c.emailId}`,

  eSign: (c: ESignContext) =>
  `borrower/loan/${c.loanId}/actionSign/${c.documentId}/attachments/${c.attachmentId}?firstName=${c.firstName}&lastName=${c.lastName}&email=${c.email}`,

  submitESign: (c: SubmitESignContext) =>
  `borrower/loan/${c.loanId}/updateSigned/${c.documentId}/attachments/${c.attachmentId}`
};

export interface LoanContext {
  // The quote's category: 'dev', 'explicit'...
  loanId: string;
  emailId: string;
}
export interface ESignUrlContext {
  loanId: string;
  emailId: string;
  name: string;
}
export interface ESignContext {
  loanId: string;
  documentId: string;
  attachmentId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface SubmitESignContext {
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

  getLoans(): Observable<string> {
    return this.httpClient
    .get(routes.loans())
    .pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load joke :-('))
    );
  }
  
  getESignUrl(context: ESignUrlContext): Observable<string> {
    return this.httpClient
      .get(routes.eSignUrl(context))
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  updateEsignedData(): Observable<string> {
    return this.httpClient
      .post(routes.updateSigned(), { "test": "test"})
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  getDocuments(context: LoanContext): Observable<string> {
    console.log(routes.documents(context));
    return this.httpClient
      .get(routes.documents(context))
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

  submitESign(context: SubmitESignContext): Observable<string> {
    return this.httpClient
      .cache()
      .put(routes.submitESign(context), {})
      .pipe(
        map((body: any) => body.viewUrl),
        catchError(() => of('Could not eSign'))
      );
  }

}

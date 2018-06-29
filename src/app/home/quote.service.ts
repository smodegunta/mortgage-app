import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  loanDetails: (c: LoanContext) =>
  `http://1a65465e.ngrok.io/borrower/loan/${c.loanId}`
};

export interface LoanContext {
  // The quote's category: 'dev', 'explicit'...
  loanId: string;
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

}

import { Component, OnInit, Input } from '@angular/core';
import { QuoteService } from '@app/providers/quote.service';
import { finalize, switchMap, map, take, filter } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const URL = 'path_to_api';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnInit {
  public loans: any;
  public isLoading: boolean;
  public eSigned: boolean;

  constructor (private quoteService: QuoteService, private route: ActivatedRoute) {}


  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.eSigned = params.esigned;
        if (!this.eSigned) this.getLoans();
        else {
          this.eSigned = params.esigned;
          this.updatedESigned();
        }
      });
  }
  
  updatedESigned() {
    this.quoteService.updateEsignedData()
    .subscribe(() => {});
  }

  getLoans() {
    this.isLoading = true;
    this.quoteService.getLoans()
    .pipe(finalize(() => { this.isLoading = false; }))
    .subscribe((response: any) => {
      this.loans = response.loans;
    });
  }
}

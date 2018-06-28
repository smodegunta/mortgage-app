import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EncompassUploadDialogComponent } from '../encompass-upload-dialog/encompass-upload-dialog.component';


export class Tile {
  color: string;
  cols: number;
  rows: number;
  text: any = {value: '', label: ''};
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;
  panelOpenState = true;
  loanDetails: any;
  loanActionItems: any[];
  loanTiles: any;

  constructor(private quoteService: QuoteService, public dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = false;
    this.quoteService.getRandomQuote({ category: 'dev' })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((quote: string) => { this.quote = quote; });
  }

  onSubmit() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.setLoanActionItems();
      this.setLoanDetails();
      this.setLoanTiles();
    }, 200);
  }

  setLoanActionItems() {
    this.loanActionItems = [
      {
        'id': '0fa69697-bcbb-4ddb-8860-46fbc8bd0e6b',
        'documentType': 'Standard Form',
        'category': '1003 - URLA',
        'description': '',
        'issuedDate': '2018-06-24T21:55:52+05:30',
        'attachments': [],
        'borrower': {
          'firstName': 'John',
          'lastName': 'Homeowner',
          'id': '_borrower1'
        },
        'coBorrower': {
          'firstName': 'Mary',
          'lastName': 'Homeowner',
          'id': '_coborrower1'
        }
      },
      {
        'id': '73ada9aa-d895-4c02-87ff-e2a5b496d4ae',
        'category': 'Bank Statements',
        'description': '',
        'issuedDate': '2018-06-24T21:55:52+05:30',
        'documentType': 'Needed',
        'attachments': [
          {
            'title': 'Untitled',
            'name': 'Attachment-50ee7fa0-b738-4826-8e92-d8219ce33bab.txt',
            'date': '2018-06-24T22:08:52+05:30'
          }
        ],
        'borrower': {
          'firstName': 'John',
          'lastName': 'Homeowner',
          'id': '_borrower1'
        },
        'coBorrower': {
          'firstName': 'Mary',
          'lastName': 'Homeowner',
          'id': '_coborrower1'
        }
      }
    ];
  }

  setLoanDetails() {
    this.loanDetails = {
        'id': '{c97cdf14-07f3-48dd-abb9-7b5e59817e58}',
        'borrower': {
          'firstName': 'John',
          'lastName': 'Homeowner',
          'address': '175 13th Street',
          'city': 'Washington',
          'state': 'DC',
          'zip': '20013'
        },
        'summary': {
          'loanNumber': 'TEST180600031',
          'loanAmount': 156350,
          'interestRate': 4.875,
          'loanPurpose': 'Purchase',
          'loanTerm': 360,
          'lockDate': '2018-06-02T21:55:52+05:30',
          'lockExpirationDate': '2018-06-24T21:55:52+05:30',
        }
      };
  }

  setLoanTiles() {
    this.loanTiles = [];
    this.loanTiles.push(...this.getSummaryTiles(this.loanDetails.summary));
  }

  getSummaryTiles(summary: any) {
    const summaryTiles: Tile[] = [
      { text: { value: summary.loanNumber, label: 'Loan Number', type: 'string'}, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.loanAmount, label: 'Loan Amount' }, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.interestRate, label: 'Intrest Rate'}, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.loanPurpose, label: 'Loan Purpose'}, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.loanTerm, label: 'Loan Term'}, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.loanAmount, label: 'Loan Amount'}, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.lockDate, label: 'Lock Date', type: 'date'}, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.lockExpirationDate, label: 'Loan Expiration Date', type: 'date'},
       cols: 1, rows: 1, color: '#F8F8F8' }

    ];
    return summaryTiles;
  }

  openDialog(file: string): void {
    const dialogRef = this.dialog.open(EncompassUploadDialogComponent, {
      width: '750px',
      data: {
        placeholder: file,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}

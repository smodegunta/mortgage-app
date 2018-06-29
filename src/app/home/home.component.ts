import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EncompassUploadDialogComponent } from '../encompass-upload-dialog/encompass-upload-dialog.component';


export class Tile {
  color: string;
  cols: number;
  rows: number;
  text: any = { value: '', label: '' };
}

const LOAN_UPLOAD = 'http://573ce40c.ngrok.io/borrower/loan/document/uploadLoanDocument';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean;
  panelOpenState = true;
  loanDetails: any;
  loanActionItems: any[];
  loanTiles: any;

  constructor(private quoteService: QuoteService, public dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = false;
    this.onSubmit();
    this.quoteService.getLoanDetails({ loanId: '9a06733f-b10c-4d45-9970-a481763cbb6c' }).subscribe(response => {
      console.log(response);
    });
    // this.quoteService.getLoanDetails({ )
    //   .pipe(finalize(() => { this.isLoading = false; }))
    //   .subscribe((response: any) => { console.log(response); });
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

  eSignDocument() {


    // let loanId = this.loanDetails.id;
    // let documentId = this.loanActionItems[4].id;
    // let attachmentId = this.loanActionItems[4].attachments[0].name;
    // let email = 'divya.gupta@brimmatech.com';

    let loanId = 'f3236bed-dd2a-4472-8000-55359aa8bd40';
    let documentId = '0fa69697-bcbb-4ddb-8860-46fbc8bd0e6b';
    let attachmentId = '0f7f0b9d-f822-48ee-b3b8-dfa02be90d3e';

    this.quoteService.eSignDocument({ loanId, documentId, attachmentId }).subscribe(url => {
      console.log(url);
      window.location.replace(url);
    });
  }

  setLoanActionItems() {

    this.loanActionItems = [{
   		"id": "428c4f78-6a62-440d-bb1c-2f11b2513e47",
   		"documentType": "Needed",
   		"category": "Bank Statements",
   		"description": "",
   		"orderedBy": "admin",
   		"issuedDate": "2018-06-28T18:12:05+05:30",
   		"borrower": {
   			"firstName": "John",
   			"lastName": "Homeowner",
   			"id": "_borrower1"
   		},
   		"attachments": []
   	}, {
   		"id": "428c4f78-6a62-440d-bb1c-2f11b2513e47",
   		"documentType": "Needed",
   		"category": "Bank Statements",
   		"description": "",
   		"orderedBy": "admin",
   		"issuedDate": "2018-06-28T18:12:05+05:30",
   		"coBorrower": {
   			"firstName": "Mary",
   			"lastName": "Homeowner",
   			"id": "_coborrower1"
   		},
   		"attachments": []
   	}, {
   		"id": "63496819-b790-4391-bd2a-c7be97dd7282",
   		"documentType": "Needed",
   		"category": "Tax Returns w/ Schedules - 2 Years",
   		"description": "",
   		"orderedBy": "admin",
   		"issuedDate": "2018-06-28T18:16:10+05:30",
   		"borrower": {
   			"firstName": "John",
   			"lastName": "Homeowner",
   			"id": "_borrower1"
   		},
   		"attachments": []
   	}, {
   		"id": "63496819-b790-4391-bd2a-c7be97dd7282",
   		"documentType": "Needed",
   		"category": "Tax Returns w/ Schedules - 2 Years",
   		"description": "",
   		"orderedBy": "admin",
   		"issuedDate": "2018-06-28T18:16:10+05:30",
   		"coBorrower": {
   			"firstName": "Mary",
   			"lastName": "Homeowner",
   			"id": "_coborrower1"
   		},
   		"attachments": []
   	}, {
   		"id": "77a19866-3692-47ff-91d1-65eef6d0b59a",
   		"documentType": "Standard Form",
   		"category": "1003 - URLA",
   		"description": "",
   		"orderedBy": "admin",
   		"issuedDate": "2018-06-28T18:04:59+05:30",
   		"borrower": {
   			"firstName": "John",
   			"lastName": "Homeowner",
   			"id": "_borrower1"
   		},
   		"attachments": [{
   			"title": "1003 - URLA",
   			"name": "ad6eeda4-7174-48d6-b051-2a4240f65f02",
   			"date": "2018-06-29T11:40:21+05:30"
   		}]
   	}, {
   		"id": "77a19866-3692-47ff-91d1-65eef6d0b59a",
   		"documentType": "Standard Form",
   		"category": "1003 - URLA",
   		"description": "",
   		"orderedBy": "admin",
   		"issuedDate": "2018-06-28T18:04:59+05:30",
   		"coBorrower": {
   			"firstName": "Mary",
   			"lastName": "Homeowner",
   			"id": "_coborrower1"
   		},
   		"attachments": [{
   			"title": "1003 - URLA",
   			"name": "ad6eeda4-7174-48d6-b051-2a4240f65f02",
   			"date": "2018-06-29T11:40:21+05:30"
   		}]
   	}];
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
      { text: { value: summary.loanNumber, label: 'Loan Number', type: 'string' }, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.loanAmount, label: 'Loan Amount' }, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.interestRate, label: 'Intrest Rate' }, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.loanPurpose, label: 'Loan Purpose' }, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.loanTerm, label: 'Loan Term' }, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.loanAmount, label: 'Loan Amount' }, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.lockDate, label: 'Lock Date', type: 'date' }, cols: 1, rows: 1, color: '#F8F8F8' },
      {
        text: { value: summary.lockExpirationDate, label: 'Loan Expiration Date', type: 'date' },
        cols: 1, rows: 1, color: '#F8F8F8'
      }

    ];
    return summaryTiles;
  }

  openDialog(file: string): void {
    const dialogRef = this.dialog.open(EncompassUploadDialogComponent, {
      width: '750px',
      data: {
        placeholder: file,
        api: LOAN_UPLOAD
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}

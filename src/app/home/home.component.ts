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

const LOAN_ID = '40e0e412-54b8-4111-8e42-144b14db70d5';
const LOAN_UPLOAD = '';
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
    this.isLoading = true;
    // this.onSubmit();
    let url = window.location.toString();
    if (url.indexOf('?event=signing_complete')) {
      this.submitEsign();
    }
    this.quoteService.getLoanDetails({loanId: LOAN_ID })
    .pipe(finalize(() => { this.isLoading = false; }))
    .subscribe((response: any) => {
      this.setLoanDetails(response.loanDetails);
    });

    this.quoteService.getActionItems({loanId: LOAN_ID })
    .pipe(finalize(() => { this.isLoading = false; }))
    .subscribe((response: any) => {
      this.setLoanActionItems(response.loanActionItems);
    });
  }

  onSubmit(loanDetails: any) {
    // this.isLoading = true;
    // setTimeout(() => {
    //   this.isLoading = false;
    //   this.setLoanActionItems();
    //   this.setLoanDetails();
    //   this.setLoanTiles();
    // }, 200);
  }

  setLoanActionItems(loanActionItems: any) {
    this.loanActionItems = loanActionItems;
  }

  setLoanDetails(loanDetails: any) {
    this.loanDetails = loanDetails;
    console.log(this.loanDetails);
    this.setLoanTiles();
  }

  setLoanTiles() {
    this.loanTiles = [];
    this.loanTiles.push(...this.getSummaryTiles(this.loanDetails.summary));
  }

  getSummaryTiles(summary: any) {
    if (!summary) {
      return [];
    }
    const summaryTiles: Tile[] = [
      { text: { value: summary.loanNumber, label: 'Loan Number', type: 'string'}, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.loanAmount, label: 'Loan Amount' }, cols: 1, rows: 1, color: '#F8F8F8' },
      { text: { value: summary.interestRate, label: 'Interest Rate'}, cols: 1, rows: 1, color: '#F8F8F8' },
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
        api: LOAN_UPLOAD
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  eSignDocument(documentId:any, attachments:any) {

    // let email = 'divya.gupta@brimmatech.com';
    const loanId = LOAN_ID;

    const urlaAttachment = attachments.find((attachment: any) => attachment.title === '1003 - URLA');
    let attachmentId = urlaAttachment.name;
    if (!attachmentId) {
      return;
    }

    localStorage.setItem('loanId', loanId);
    localStorage.setItem('documentId', documentId);
    localStorage.setItem('attachmentId', attachmentId);

    this.isLoading = true;
    this.quoteService.eSignDocument({ loanId, documentId, attachmentId }).subscribe(url => {
      console.log(url);
      this.isLoading = false;
      window.location.replace(url);
    });
  }

  submitEsign() {
    let loanId = localStorage.getItem('loanId');
    let documentId = localStorage.getItem('documentId');
    let attachmentId = localStorage.getItem('attachmentId');

    this.isLoading = true;

    if (loanId && documentId && attachmentId) {
      this.quoteService.submitESign({ loanId, documentId, attachmentId }).subscribe(url => {
        console.log(url);
        this.isLoading = false;

        localStorage.removeItem('loanId');
        localStorage.removeItem('documentId');
        localStorage.removeItem('attachmentId');
      });
    }
  }

  isURLAAttachment(attachments: any) {
    // to be removed

    const urlaAttachment = attachments.find((attachment: any) => attachment.title === '1003 - URLA');
    if (urlaAttachment) {
      return true;
    }
    return false;

  }
}

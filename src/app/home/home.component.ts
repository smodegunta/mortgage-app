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
        api: LOAN_UPLOAD
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  eSignDocument() {


    // let loanId = this.loanDetails.id;
    // let documentId = this.loanActionItems[4].id;
    // let attachmentId = this.loanActionItems[4].attachments[0].name;
    // let email = 'divya.gupta@brimmatech.com';
    const loanId = 'f3236bed-dd2a-4472-8000-55359aa8bd40';
    const documentId = '0fa69697-bcbb-4ddb-8860-46fbc8bd0e6b';
    const attachmentId = '0f7f0b9d-f822-48ee-b3b8-dfa02be90d3e';

    this.quoteService.eSignDocument({ loanId, documentId, attachmentId }).subscribe(url => {
      console.log(url);
      window.location.replace(url);
    });
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

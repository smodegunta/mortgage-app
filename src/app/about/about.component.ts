import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';

const URL = 'http://573ce40c.ngrok.io/borrower/loan/submitLoan';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
 api = URL;
}

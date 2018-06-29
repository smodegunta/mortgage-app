import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';

const URL = 'http://e1fa8a70.ngrok.io/borrower/loan/submitLoan';
const data = {
  'documentLocator': 'DEV/1j9gRwgMQ9yOQak4lFg2_CKs & Marlboro LL Clinic 2017 (1).pdf'
};
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
 api = URL;
 data = data;
}

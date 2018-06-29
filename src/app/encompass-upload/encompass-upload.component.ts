import { Component, OnInit, Input } from '@angular/core';

import { environment } from '@env/environment';
import { FileUploader } from 'ng2-file-upload';
const URL = 'path_to_api';

export interface FileElement {
  name: string;
  size: number;
  progress: number;
  actions: string;
}

@Component({
  selector: 'app-encompass-upload',
  templateUrl: './encompass-upload.component.html',
  styleUrls: ['./encompass-upload.component.scss']
})
export class EncompassUploadComponent implements OnInit {
  displayedColumns: string[] = ['name', 'size', 'progress', 'actions'];

  public uploader: FileUploader;
  version: string = environment.version;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  // tslint:disable-next-line:no-input-rename
  @Input('placeholder') placeholder: string;
  // tslint:disable-next-line:no-input-rename
  @Input('api') api: string;

  constructor () {
  }


  ngOnInit() {
    console.log('api', this.api);
    console.log('api', this.placeholder);
    const data = {
      'documentLocator': 'DEV/1j9gRwgMQ9yOQak4lFg2_CKs & Marlboro LL Clinic 2017 (1).pdf'
     };
    this.uploader = new FileUploader({
      url: 'http://e1fa8a70.ngrok.io/borrower/loan/submitLoan',
      method: 'POST',
      parametersBeforeFiles: true,
      additionalParameter: {
        data: JSON.stringify(data)
      }
    });


    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe( (res: any) => {
      this.response = res;
    } );
   }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

}

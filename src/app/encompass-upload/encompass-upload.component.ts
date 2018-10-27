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
  status: string;
  // tslint:disable-next-line:no-input-rename
  @Input('placeholder') placeholder: string;
  // tslint:disable-next-line:no-input-rename
  @Input('api') api: string;
  // tslint:disable-next-line:no-input-rename
  @Input('formData') data: any;

  constructor () {
  }


  ngOnInit() {
    console.log('api', this.api);
    console.log('api', this.placeholder);
    console.log(this.data);
    this.uploader = new FileUploader({
      url: this.api,
      method: 'POST',
      parametersBeforeFiles: true,
      additionalParameter: {
        data: JSON.stringify(this.data)
      },
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe( (res: any) => {
      this.response = res;
    });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

}

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

  constructor () {
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item: any) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });


    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe( (res: any) => {
      this.response = res;
    } );
  }


  ngOnInit() { }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

}

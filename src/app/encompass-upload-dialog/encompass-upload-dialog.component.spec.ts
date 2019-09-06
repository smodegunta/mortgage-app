import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncompassUploadDialogComponent } from './encompass-upload-dialog.component';

describe('EncompassUploadDialogComponent', () => {
  let component: EncompassUploadDialogComponent;
  let fixture: ComponentFixture<EncompassUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncompassUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncompassUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

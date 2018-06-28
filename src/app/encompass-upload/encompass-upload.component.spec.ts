import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncompassUploadComponent } from './encompass-upload.component';

describe('EncompassUploadComponent', () => {
  let component: EncompassUploadComponent;
  let fixture: ComponentFixture<EncompassUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncompassUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncompassUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InjectionToken } from '@angular/core';
import { AddCommentDialogComponent } from './add-comment.component';

import { MaterialUiModule } from 'src/app/material/material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('AddCommentComponent', () => {
  let component: AddCommentDialogComponent;
  let fixture: ComponentFixture<AddCommentDialogComponent>;

  const matMdcDialogDataMock = new InjectionToken<any>('MatMdcDialogData');

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommentDialogComponent],
      imports: [MaterialUiModule, HttpClientModule, FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close']) },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: matMdcDialogDataMock, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(AddCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

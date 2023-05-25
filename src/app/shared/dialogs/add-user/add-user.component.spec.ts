import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserDialogComponent } from './add-user.component';

import { MatDialogRef } from '@angular/material/dialog';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MaterialUiModule } from 'src/app/material/material.module';

import { FormsModule } from '@angular/forms';
describe('AddUserComponent', () => {
  let component: AddUserDialogComponent;
  let fixture: ComponentFixture<AddUserDialogComponent>;

  const matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserDialogComponent],
      imports: [HttpClientModule, MaterialUiModule, FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
      ]
    });
    fixture = TestBed.createComponent(AddUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

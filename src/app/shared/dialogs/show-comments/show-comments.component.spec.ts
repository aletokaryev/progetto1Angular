import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ShowCommentsDialogComponent } from './show-comments.component';

describe('ShowCommentsComponent', () => {
  let component: ShowCommentsDialogComponent;
  let fixture: ComponentFixture<ShowCommentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowCommentsDialogComponent],
      imports: [MatDialogModule, HttpClientModule],
      providers: [
        MatDialog, // Fornisce il servizio MatDialog
        HttpClient, // Fornisce il servizio HttpClient
        { provide: MatDialogRef, useValue: {} }, // Fornisce un valore fittizio per MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} } // Fornisce un valore fittizio per MAT_DIALOG_DATA
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCommentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

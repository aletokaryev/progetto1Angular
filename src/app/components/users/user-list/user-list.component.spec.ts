import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

import { NavComponent } from 'src/app/shared/nav/nav.component';
import { MaterialUiModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ActivatedRoute } from '@angular/router';

import { CustomSearchPipe } from 'src/app/shared/pipes/custom-search-pipe.pipe';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let authService: AuthService;
  let dialog: MatDialog;

  const users: User[] = [
    { id: 1, name: 'John', email: 'john@example.com', status: 'active', gender: 'male' },
    { id: 2, name: 'Jane', email: 'jane@example.com', status: 'inactive', gender: 'female' },
  ];

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: () => '1'
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent, NavComponent, CustomSearchPipe],
      imports: [MaterialUiModule, FormsModule, BrowserAnimationsModule, RouterModule,],
      providers: [
        { provide: UserService, useValue: jasmine.createSpyObj('UserService', ['getUsers', 'deleteUser']) },
        { provide: AuthService, useValue: jasmine.createSpyObj('AuthService', ['getToken']) },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    dialog = TestBed.inject(MatDialog);

    (userService.getUsers as jasmine.Spy).and.returnValue(of(users));
    (authService.getToken as jasmine.Spy).and.returnValue('test-token');

    fixture.detectChanges();
  });

  it('should fetch and display users on initialization', () => {
    expect(userService.getUsers).toHaveBeenCalledWith(component.pageSize, component.currentPage, 'test-token');
    expect(component.users).toEqual(users);
    expect(component.loading).toBeFalse();
  });

  it('should load more users', () => {
    const num = 20;
    component.loadMore(num);
    expect(component.loading).toBeTrue();
    expect(component.pageSize).toEqual(num);
    expect(userService.getUsers).toHaveBeenCalledWith(num, component.currentPage, 'test-token');
  });

  it('should change page and fetch users', () => {
    const pageNumber = 2;
    component.changePage(pageNumber);
    expect(component.loading).toBeTrue();
    expect(component.currentPage).toEqual(pageNumber);
    expect(userService.getUsers).toHaveBeenCalledWith(component.pageSize, pageNumber, 'test-token');
  });

  it('should delete a user and reload the page', () => {
    const userID = 1;
    component.deleteUserByID(userID);
    expect(userService.deleteUser).toHaveBeenCalledWith(userID, 'test-token');
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from './user-details.component';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { AddCommentDialogComponent } from 'src/app/shared/dialogs/add-comment/add-comment.component';

import { NavComponent } from 'src/app/shared/nav/nav.component';
import { MaterialUiModule } from 'src/app/material/material.module';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let activatedRouteMock: any;
  let userServiceMock: any;
  let postServiceMock: any;
  let authServiceMock: any;
  let matDialogMock: any;

  beforeEach(async () => {
    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: () => '1' // Mocking route param 'id' as '1'
        }
      }
    };

    userServiceMock = jasmine.createSpyObj('UserService', ['getUserById', 'getUserPost']);
    userServiceMock.getUserById.and.returnValue(of({ id: 1, name: 'John Doe' }));
    userServiceMock.getUserPost.and.returnValue(of([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]));

    postServiceMock = jasmine.createSpyObj('PostService', ['getPostComments']);
    postServiceMock.getPostComments.and.returnValue(of([{ id: 1, text: 'Comment 1' }, { id: 2, text: 'Comment 2' }]));

    authServiceMock = jasmine.createSpyObj('AuthService', ['getToken']);
    authServiceMock.getToken.and.returnValue('token');

    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogMock.open.and.returnValue({ afterClosed: () => of({ id: 1, text: 'New Comment' }) });

    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent, NavComponent],
      imports: [MaterialUiModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: PostService, useValue: postServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: MatDialog, useValue: matDialogMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch user details on initialization', () => {
    expect(component.users).toEqual({ id: 1, name: 'John Doe' });
    expect(userServiceMock.getUserById).toHaveBeenCalledWith('1', 'token');
  });

  it('should fetch user posts on initialization', () => {
    expect(component.posts).toEqual([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]);
    expect(userServiceMock.getUserPost).toHaveBeenCalledWith('1', 'token');
  });

  it('should fetch post comments', () => {
    component.getPostComments('1');
    expect(component.comments).toEqual([{ id: 1, text: 'Comment 1' }, { id: 2, text: 'Comment 2' }]);
    expect(postServiceMock.getPostComments).toHaveBeenCalledWith('1', 'token');
  });

  it('should open add comment dialog and add new comment', async () => {
    const openDialogSpy = spyOn(matDialogMock, 'open').and.returnValue({ afterClosed: () => of({ id: 1, text: 'New Comment' }) });

    await component.openAddCommentDialog('1');

    expect(openDialogSpy).toHaveBeenCalledWith(AddCommentDialogComponent, {
      data: { postId: '1' },
    });

    expect(matDialogMock.open).toHaveBeenCalledTimes(1);
    expect(postServiceMock.getPostComments).toHaveBeenCalledWith('1', 'token');

    // Attendi la chiamata asincrona prima di verificare le asserzioni sugli aggiornamenti dei commenti
    fixture.whenStable().then(() => {
      expect(component.comments.length).toBe(1);
      expect(component.comments[0].text).toBe('New Comment');
    });
  });



});

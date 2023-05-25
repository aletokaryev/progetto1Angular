import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { PostsComponent } from './posts.component';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { AddPostDialogComponent } from 'src/app/shared/dialogs/add-post/add-post.component';
import { ShowCommentsDialogComponent } from 'src/app/shared/dialogs/show-comments/show-comments.component';


import { NavComponent } from 'src/app/shared/nav/nav.component';

import { MaterialUiModule } from 'src/app/material/material.module';

import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { CustomSearchPipe } from 'src/app/shared/pipes/custom-search-pipe.pipe';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let postServiceMock: any;
  let authServiceMock: any;
  let userServiceMock: any;
  let matDialogMock: any;

  beforeEach(async () => {
    postServiceMock = jasmine.createSpyObj('PostService', ['getPosts', 'deletePost']);
    postServiceMock.getPosts.and.returnValue(of([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]));
    postServiceMock.deletePost.and.returnValue(of({}));

    authServiceMock = jasmine.createSpyObj('AuthService', ['getToken']);
    authServiceMock.getToken.and.returnValue('token');

    userServiceMock = jasmine.createSpyObj('UserService', ['getUserById']);
    userServiceMock.getUserById.and.returnValue(of({ id: 1, name: 'John Doe' }));

    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogMock.open.and.returnValue({});

    await TestBed.configureTestingModule({
      declarations: [PostsComponent, NavComponent, CustomSearchPipe],
      imports: [MaterialUiModule, HttpClientModule, FormsModule],
      providers: [
        HttpClient,
        { provide: PostService, useValue: postServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: MatDialog, useValue: matDialogMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch posts on initialization', () => {
    expect(component.posts).toEqual([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]);
    expect(postServiceMock.getPosts).toHaveBeenCalledWith(10, 1, 'token');
  });

  it('should load more posts', () => {
    component.loadMore(20);
    expect(component.pageSize).toBe(20);
    expect(postServiceMock.getPosts).toHaveBeenCalledWith(20, 1, 'token');
  });

  it('should change current page', () => {
    component.changePage(2);
    expect(component.currentPage).toBe(2);
    expect(postServiceMock.getPosts).toHaveBeenCalledWith(10, 2, 'token');
  });

  it('should open add post dialog', () => {
    component.addPost();
    expect(matDialogMock.open).toHaveBeenCalledWith(AddPostDialogComponent, { width: '350px' });
  });

  it('should open show comments dialog', () => {
    component.showComments(1);
    expect(matDialogMock.open).toHaveBeenCalledWith(ShowCommentsDialogComponent, { width: '350px', height: '500px', data: { postId: 1 } });
  });

  it('should delete a post', () => {
    component.deletePost(1);
    expect(postServiceMock.deletePost).toHaveBeenCalledWith(1, 'token');
  });
});

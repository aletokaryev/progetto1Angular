import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { NavComponent } from './shared/nav/nav.component';
import { PostsComponent } from './components/posts/posts.component';
import { AddCommentDialogComponent } from './shared/dialogs/add-comment/add-comment.component';
import { CustomSearchPipe } from './shared/pipes/custom-search-pipe.pipe';
import { MaterialUiModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { AddUserDialogComponent } from './shared/dialogs/add-user/add-user.component';
import { AddPostDialogComponent } from './shared/dialogs/add-post/add-post.component';
import { ShowCommentsDialogComponent } from './shared/dialogs/show-comments/show-comments.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    UserDetailsComponent,
    NavComponent,
    PostsComponent,
    AddCommentDialogComponent,
    CustomSearchPipe,
    AddUserDialogComponent,
    AddPostDialogComponent,
    ShowCommentsDialogComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialUiModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

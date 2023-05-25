import { Component, Inject } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCommentDialogComponent } from '../add-comment/add-comment.component';

@Component({
  selector: 'app-show-comments-dialog',
  templateUrl: './show-comments.component.html',
  styleUrls: ['./show-comments.component.scss']
})
export class ShowCommentsDialogComponent {

  postId: any;
  comments: any[] = [];

  token = this.auth.getToken()!;

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<ShowCommentsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private postService: PostService, private auth: AuthService,) {
    this.postId = data.postId;
    this.postService.getPostComments(this.postId, this.token).subscribe((data: any) => {
      this.comments = data;
    });
  }

  openAddCommentDialog() {
    const dialogRef = this.dialog.open(AddCommentDialogComponent, {
      data: { postId: this.data.postId },
    });

    dialogRef.afterClosed().subscribe((newComment: any) => {
      if (newComment) {
        this.comments.push(newComment);
      }
    });
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddCommentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: PostService, private auth: AuthService) {}

  newComment: any = {};
  token = this.auth.getToken()!;


  onNoClick(): void {
    this.dialogRef.close();
  }

  error: string | undefined;

  onSubmit(): void{
    this.http.createComment(this.newComment, this.data.postId, this.token).subscribe((response: any)=>{
      location.reload();
      this.dialogRef.close();
    },
    (error: any) =>{
      console.log(error);
      this.error =error.error[0].field + " " + error.error[0].message;
    });
  }
}

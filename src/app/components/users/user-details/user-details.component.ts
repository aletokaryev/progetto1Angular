import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
//import { AddCommentDialogComponent } from 'src/app/core/components/add-comment-dialog/add-comment-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { AddCommentDialogComponent } from 'src/app/shared/dialogs/add-comment/add-comment.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  users: any;
  posts: any[] = [];
  comments: any[] = [];
  post_id: string = "";

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private auth: AuthService,
    private dialog: MatDialog,
  ) { }

  token = this.auth.getToken()!;

  ngOnInit(): void {
    // Recupera l'id dell'utente dalla route
    const id = this.route.snapshot.paramMap.get('id');

    // Se è presente un id, recupera l'utente corrispondente
    if (id) {
      this.userService.getUserById(id, this.token).subscribe((data: any) => {
        this.users = data;
        this.loading = false;
      });
    }

    // Ottiene i post dell'utente
    this.getUserPost();
  }

  // Ottiene i post dell'utente
  getUserPost() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');

    this.userService.getUserPost(id, this.token).subscribe((data: any) => {
      let i = 0;
      this.posts = data;

      while (i < this.posts.length) {
        this.getPostComments(String(this.posts[i].id)); // Convert postId to string
        i++;
      }

      this.loading = false;
    });
  }


  // Ottiene i commenti di un post
  getPostComments(postId: string) {
    this.post_id = postId;

    // Effettua la chiamata API per ottenere i commenti del post
    this.postService.getPostComments(postId, this.token).subscribe((data: any) => {
      this.comments = data;
    });
  }

  // Apre il dialog per aggiungere un commento
  openAddCommentDialog(postId: string) {
     const dialogRef = this.dialog.open(AddCommentDialogComponent, {
       data: { postId: postId },
     });

     // Dopo la chiusura del dialog, aggiunge il nuovo commento alla lista
     dialogRef.afterClosed().subscribe((newComment: any) => {
       if (newComment) {
         this.comments.push(newComment);
       }
     });
   }
}

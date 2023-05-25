import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { AddPostDialogComponent } from 'src/app/shared/dialogs/add-post/add-post.component';
import { ShowCommentsDialogComponent } from 'src/app/shared/dialogs/show-comments/show-comments.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(
    private postService: PostService,
    private auth: AuthService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.showPosts();
  }

  pageSize = 10;
  currentPage = 1;

  posts: any[] = [];
  loading = true;

  term: string = "";

  token = this.auth.getToken()!;

  // Metodo per recuperare i post
  showPosts() {
    this.postService.getPosts(this.pageSize, this.currentPage, this.token).subscribe(
      (data: any) => {
        this.posts = data;
        // Per ogni post, viene recuperato l'utente associato
        this.posts.forEach((post: any) => {
          this.userService.getUserById(post.user_id, this.token).subscribe((user: any) => {
            post.userDetails = user;
          });
        });
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // Metodo per caricare più post
  loadMore(num: number) {
    this.loading = true;
    this.pageSize = num;
    this.showPosts();
  }

  // Metodo per cambiare la pagina corrente
  changePage(pageNumber: number) {
    this.loading = true;
    this.currentPage = pageNumber;
    this.showPosts();
  }

  // Metodo per aggiungere un nuovo post
  addPost(): void {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      width: '350px',
    });
  }

  // Metodo per mostrare i commenti di un post
  showComments(postId: any): void {
    const dialogRef = this.dialog.open(ShowCommentsDialogComponent, {
      width: '350px',
      height: '500px',
      data: { postId: postId }
    });
  }

  // Metodo per eliminare un post
  deletePost(id: any) {
    this.postService.deletePost(id, this.token).subscribe(() => {
      location.reload();
    });
  }
}

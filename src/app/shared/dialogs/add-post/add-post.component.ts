import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddPostDialogComponent>, private http: PostService, private auth: AuthService) {}

  newPost: any = {};
  token = this.auth.getToken()!;

  error: string | undefined;

  onNoClick(): void {
    // Chiude la finestra di dialogo senza effettuare alcuna azione
    this.dialogRef.close();
  }

  onSubmit(): void {
    // Invia una richiesta HTTP per creare un nuovo post utilizzando il servizio HttpServiceService
    this.http.createPost(this.newPost, this.token).subscribe(
      (response: any) => {
        // Se la richiesta ha successo, ricarica la pagina e chiude la finestra di dialogo
        location.reload();
        this.dialogRef.close();
      },
      (error: any) => {
        // Se la richiesta fallisce, gestisce l'errore
        console.log(error);
        // Assegna il messaggio di errore alla variabile 'error' per la visualizzazione nell'interfaccia utente
        this.error = error.error[0].field + " " + error.error[0].message;
      }
    );
  }
}

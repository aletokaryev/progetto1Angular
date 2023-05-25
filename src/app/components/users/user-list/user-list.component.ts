import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
//import { AddUserDialogComponent } from 'src/app/core/components/add-user-dialog/add-user-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { AddUserDialogComponent } from 'src/app/shared/dialogs/add-user/add-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'gender', "actions"];
  users: User[] = [];
  loading = true;

  pageSize = 10;
  currentPage = 1;

  term: string = "";

  constructor(private http: UserService, private dialog: MatDialog, private auth: AuthService) { }

  token = this.auth.getToken()!;

  /**
   * Metodo di inizializzazione del componente. Richiamato dopo che il componente è stato creato.
   * Recupera il token di autenticazione, mostra gli utenti e aggiunge un ascoltatore per l'evento "userDeleted".
   */
  ngOnInit(): void {
    this.showUsers();
    document.addEventListener('userDeleted', () => {
      this.showUsers();
    });
  }

  /**
   * Recupera gli utenti dalla API utilizzando il servizio HttpServiceService e popola l'array "users".
   */
  showUsers() {
    this.http.getUsers(this.pageSize, this.currentPage, this.token).subscribe((data: any) => {
      this.users = data;
      this.loading = false;
    },
    (error: any) => {
      console.log(error);
    });
  }

  /**
   * Carica più utenti impostando la dimensione della pagina "pageSize" e richiamando il metodo showUsers().
   * @param num - Numero di utenti da caricare.
   */
  loadMore(num: number) {
    this.loading = true;
    this.pageSize = num;
    this.showUsers();
  }

  /**
   * Cambia la pagina corrente e richiama il metodo showUsers() per caricare gli utenti della nuova pagina.
   * @param pageNumber - Numero della pagina da visualizzare.
   */
  changePage(pageNumber: number) {
    this.loading = true;
    this.currentPage = pageNumber;
    this.showUsers();
  }

  /**
   * Elimina un utente specifico dalla API utilizzando il servizio HttpServiceService e ricarica la pagina.
   * @param id - ID dell'utente da eliminare.
   */
  deleteUserByID(id: any) {
    this.http.deleteUser(id, this.token).subscribe(() => {
      location.reload();
    });
  }

  /**
   * Apre il dialogo per aggiungere un nuovo utente utilizzando il componente AddUserDialogComponent.
   */
   addUser(): void {
     const dialogRef = this.dialog.open(AddUserDialogComponent, {
       width: '350px',
     });
   }
}

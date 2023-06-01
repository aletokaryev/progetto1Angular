import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  token: string = '';
  errorMessage: string = "";

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {
    environment.tokenKey = this.token;
  }

  onSubmit(): void {
    // Invocazione di una richiesta HTTP GET all'API con il token fornito
    this.http.get('https://gorest.co.in/public/v2/users', { headers: { Authorization: `Bearer ${this.token}` } })
    .subscribe(
      () => {
        // Se la richiesta ha successo, imposta il token nell'AuthService e reindirizza l'utente alla pagina '/users'
        this.auth.setToken(this.token);
        this.router.navigate(['users']);
      },
      (error: any) => {
        // Se la richiesta fallisce, gestisci l'errore
        console.error('Invalid token');
        // Assegna il messaggio di errore alla variabile errorMessage per visualizzarlo nell'interfaccia utente
        this.errorMessage = error.error.message;
      }
    );
  }
}

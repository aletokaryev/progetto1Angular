import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { AuthGuard } from './guards/auth.guard';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, // Pagina di accesso predefinita
  { path: 'logout', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: LoginComponent}, // Pagina di autenticazione
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] }, // Lista degli utenti (protetta da autenticazione)
  { path: 'users/:id', component: UserDetailsComponent, canActivate: [AuthGuard] }, // Dettagli dell'utente (protetti da autenticazione)
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] }, // Lista dei post (protetta da autenticazione)
  { path: '**', redirectTo: 'users' }  // Gestione di path non validi (reindirizzamento alla pagina di login)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

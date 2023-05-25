import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    /**
   * Ottiene una lista di utenti dalla API.
   * @param perPage - Numero di utenti per pagina.
   * @param currentPage - Pagina corrente.
   * @param token (opzionale) - Token di autorizzazione per l'accesso alla API.
   * @returns Una richiesta HTTP GET per ottenere una lista di utenti.
   */
    getUsers(perPage: number, currentPage: number, token?: string) {
      let head_obj;
      if (token) {
        head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
      }
      return this.http.get(`https://gorest.co.in/public/v2/users?page=${currentPage}&per_page=${perPage}`, { headers: head_obj });
    }

    /**
     * Ottiene un utente specifico dalla API utilizzando l'ID dell'utente.
     * @param id - ID dell'utente.
     * @param token (opzionale) - Token di autorizzazione per l'accesso alla API.
     * @returns Una richiesta HTTP GET per ottenere l'utente specificato.
     */
    getUserById(id: any, token?: string) {
      let head_obj;
      if (token) {
        head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
      }
      return this.http.get(`https://gorest.co.in/public/v2/users/${id}`, { headers: head_obj });
    }

    /**
     * Elimina un utente specifico dalla API utilizzando l'ID dell'utente.
     * @param userID - ID dell'utente da eliminare.
     * @param token (opzionale) - Token di autorizzazione per l'accesso alla API.
     * @returns Una richiesta HTTP DELETE per eliminare l'utente specificato.
     */
    deleteUser(userID: any, token?: string) {
      let head_obj;
      if (token) {
        head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
      }
      return this.http.delete(`https://gorest.co.in/public/v2/users/${userID}`, { headers: head_obj });
    }

  /**
   * Ottiene i post di un utente specifico dalla API utilizzando l'ID dell'utente.
   * @param id - ID dell'utente.
   * @param token (opzionale) - Token di autorizzazione per l'accesso alla API.
   * @returns Una richiesta HTTP GET per ottenere i post dell'utente specificato.
   */
  getUserPost(id: any, token?: string) {
    let head_obj;
    if (token) {
      head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    }
    return this.http.get(`https://gorest.co.in/public/v2/users/${id}/posts`, { headers: head_obj });
  }

    /**
   * Crea un nuovo utente inviando i dettagli dell'utente alla API.
   * @param user - Oggetto contenente i dettagli del nuovo utente da creare.
   * @param token (opzionale) - Token di autorizzazione per l'accesso alla API.
   * @returns Una richiesta HTTP POST per creare un nuovo utente.
   */
    createUser(user: any, token?: string) {
      const body = {
        email: user.email,
        name: user.name,
        gender: user.gender,
        status: user.status
      };
      let head_obj;
      if (token) {
        head_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
      }
      return this.http.post(`https://gorest.co.in/public/v2/users`, body, { headers: head_obj });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  /**
   * Crea un nuovo post inviando i dettagli del post alla API.
   * @param post - Oggetto contenente i dettagli del nuovo post da creare.
   * @param token (opzionale) - Token di autorizzazione per l'accesso alla API.
   * @returns Una richiesta HTTP POST per creare un nuovo post.
   */
  createPost(post: any, token?: string) {
    const body = {
      user: post.user,
      user_id: post.user,
      title: post.title,
      body: post.body,
    };
    let head_obj;
    if (token) {
      head_obj = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    }
    return this.http.post(`https://gorest.co.in/public/v2/posts`, body, {
      headers: head_obj,
    });
  }

  /**
   * Ottiene una lista di post dalla API.
   * @param perPage - Numero di post per pagina.
   * @param currentPage - Pagina corrente.
   * @param token (opzionale) - Token di autorizzazione per l'accesso alla API.
   * @returns Una richiesta HTTP GET per ottenere una lista di post.
   */
  getPosts(perPage: number, currentPage: number, token?: string) {
    let head_obj;
    if (token) {
      head_obj = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    }
    return this.http.get(
      `https://gorest.co.in/public/v2/posts?page=${currentPage}&per_page=${perPage}`,
      { headers: head_obj }
    );
  }

  /**
   * Elimina un post specifico dalla API utilizzando l'ID del post.
   * @param postID - ID del post da eliminare.
   * @param token (opzionale) - Token di autorizzazione per l'accesso alla API.
   * @returns Una richiesta HTTP DELETE per eliminare il post specificato.
   */
  deletePost(postID: any, token?: string) {
    let head_obj;
    if (token) {
      head_obj = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    }
    return this.http.delete(`https://gorest.co.in/public/v2/posts/${postID}`, {
      headers: head_obj,
    });
  }

  /**
   * Ottiene i commenti di un post specifico dalla API utilizzando l'ID del post.
   * @param id - ID del post.
   * @param token (opzionale) - Token di autorizzazione per l'accesso alla API.
   * @returns Una richiesta HTTP GET per ottenere i commenti del post specificato.
   */
  getPostComments(id: any, token?: string) {
    let head_obj;
    if (token) {
      head_obj = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    }
    return this.http.get(
      `https://gorest.co.in/public/v2/posts/${id}/comments`,
      { headers: head_obj }
    );
  }

  /**
   * Crea un nuovo commento inviando i dettagli del commento alla API.
   * @param post - Oggetto contenente i dettagli del commento da creare.
   * @param postID - ID del post a cui il commento è associato.
   * @param token (opzionale) - Token di autorizzazione per l'accesso alla API.
   * @returns Una richiesta HTTP POST per creare un nuovo commento.
   */
  createComment(post: any, postID: number, token?: string) {
    const body = {
      name: post.name,
      email: post.email,
      body: post.body,
    };
    let head_obj;
    if (token) {
      head_obj = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    }
    return this.http.post(
      `https://gorest.co.in/public/v2/posts/${postID}/comments`,
      body,
      { headers: head_obj }
    );
  }
}

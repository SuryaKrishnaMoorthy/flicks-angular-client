import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const apiUrl = 'https://flicks-api-24f25506e519.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

/**
 * @description  Service class to handle API requests related to user registration, login, movie retrieval, user information retrieval, and manipulation.
 *
 * @class
 * @name FetchApiDataService
 */
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http

 /**
   * Constructs an instance of FetchApiDataService with an injected HttpClient module.
   * @param {HttpClient} http The HttpClient module to make HTTP requests.
   */
  constructor(private http: HttpClient) {
  }


 /**
   * Sends a POST request to register a user.
   * @param {any} userDetails Details of the user to be registered.
   * @returns {Observable<any>} An Observable of the HTTP response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Sends a POST request to authenticate a user.
   * @param {any} userDetails User credentials for authentication.
   * @returns {Observable<any>} An Observable of the HTTP response.
   */
  public userLogin(userDetails: any): Observable<any> {    
    return this.http.post(apiUrl + 'login?'+`Username=${userDetails.Username}&Password=${userDetails.Password}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Sends a GET request to retrieve all movies.
   * @returns {Observable<any>} An Observable of the HTTP response.
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Sends a GET request to retrieve a specific movie by its name.
   * @param {string} movieName The name of the movie to retrieve.
   * @returns {Observable<any>} An Observable of the HTTP response.
   */
  public getOneMovie(movieName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/:${movieName}` , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Sends a GET request to retrieve movies by a specific director.
   * @param {string} directorName The name of the director.
   * @returns {Observable<any>} An Observable of the HTTP response.
   */
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/director/:${directorName}` , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Sends a GET request to retrieve movies by a specific genre.
   * @param {string} genreName The name of the genre.
   * @returns {Observable<any>} An Observable of the HTTP response.
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}movies/genre/:${genreName}` , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Sends a GET request to retrieve user information by user ID.
   * @param {string} userId The ID of the user.
   * @returns {Observable<any>} An Observable of the HTTP response.
   */
  public getUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}users/${userId}` , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Api not create in backend
  /**
   * Sends a GET request to retrieve favorite movies of a user by user ID.
   * @param {string} userId The ID of the user.
   * @returns {Observable<any>} An Observable of the HTTP response.
   */
  /**
  public getFavoriteMovies(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}users/:${userId}/favoriteMovies` , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      // map(this.extractResponseData),

      catchError(this.handleError)
    );
  }
   */

  /**
   * Sends a PUT request to add a movie to the favorites of a user.
   * @param {string} userId The ID of the user.
   * @param {string} movieId The ID of the movie to be added to favorites.
   * @returns {Observable<any>} An Observable of the HTTP response.
   */
  public addFavoriteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');    
    return this.http.put(`${apiUrl}users/${userId}/${movieId}`, {id: userId}, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }), responseType: 'text'}, ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Sends a PUT request to edit user information.
   * @param {string} userId The ID of the user.
   * @param {any} userDetails Details of the user to be edited.
   * @returns {Observable<any>} An Observable of the HTTP response.
   */
  public editUser(userId: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${apiUrl}users/${userId}` , userDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Sends a DELETE request to delete a user by user ID.
   * @param {string} userId The ID of the user.
   * @returns {Observable<any>} An Observable of the HTTP response.
   */
  public deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${userId}` , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Sends a DELETE request to remove a movie from the favorites of a user.
   * @param {string} userId The ID of the user.
   * @param {string} movieId The ID of the movie to be removed from favorites.
   * @returns {Observable<any>} An Observable of the HTTP response.
   */
  public deleteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${userId}/${movieId}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }), responseType: 'text'}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Extracts response data from HTTP responses.
   * @param {any} res The HTTP response.
   * @returns {any} Extracted response data.
  */
  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

/**
   * Handles HTTP errors.
   * @param {HttpErrorResponse} error The HTTP error response.
   * @returns {any} An Error object.
   */
private handleError(error: HttpErrorResponse): any {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
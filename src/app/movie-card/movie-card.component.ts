import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

/**
 * Component for displaying movie cards.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss', ]
})

export class MovieCardComponent {
  /**
   * Array to hold movie data.
   */
  movies: any[] = []

  /**
   * User ID fetched from local storage.
   */
  public userId = localStorage.getItem("userId");

  /**
   * Constructs an instance of MovieCardComponent.
   * @param {FetchApiDataService} fetchApiDataService Service for fetching data from API.
   * @param {MatDialog} dialog Service for opening dialogs from Angular Material.
   * @param {MatSnackBar} snackBar Service for displaying notifications to the user from Angular Material.
   */
  constructor(
    public fetchApiDataService: FetchApiDataService, 
    public dialog: MatDialog,
    public snackBar: MatSnackBar,){}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Retrieves movies when the component is initialized.
   */
  ngOnInit():void{
    this.getMovies();
  }

  /**
   * Retrieves movies from the API.
   */
  getMovies(): void {
    this.fetchApiDataService.getAllMovies().subscribe({next: (response: any) => {
      this.movies = response;      
      return this.movies;
    }, error: () => {}});
  }

   /**
   * Opens a dialog to display movie details.
   */
  openMovieDialog():void {
    this.dialog.open(MovieCardComponent, {})
  }

  /**
   * Opens a dialog to display genre details.
   * @param {any} genre Genre data.
   */
  openGenre(genre: any):void {
    this.dialog.open(GenreComponent, {
      width: "100%",
      maxWidth   : '400px',
      maxHeight  : '700px',
      data: genre
    });   
    console.log(genre);
     
  }

  /**
   * Opens a dialog to display director details.
   * @param {any} director Director data.
   */
  openDirector(director: any):void {
    this.dialog.open(DirectorComponent, {
      width: "100%",
      // maxWidth   : '400px',
      maxHeight  : '700px',
      data: director
    });   
  }

  /**
   * Opens a dialog to display movie synopsis.
   * @param {any} synopsis Synopsis data.
   */
  openSynopsis(synopsis: any):void {
    this.dialog.open(SynopsisComponent, {
      width: "100%",
      // maxWidth   : '400px',
      maxHeight  : '700px',
      data: synopsis
    });   
    console.log(synopsis);
  }

  /**
   * Checks if a movie is marked as favorite.
   * @param {any} movieId ID of the movie.
   * @returns {boolean} Boolean indicating if the movie is favorite or not.
   */
  isFavorite(movieId: any):boolean {
    const favoriteMovies = localStorage.getItem("favoriteMovies");
    return favoriteMovies? favoriteMovies?.includes(movieId) : false;
  }

  /**
   * Toggles a movie as favorite or removes it from favorites.
   * @param {any} movieId ID of the movie.
   */
  toggleFavorite(movieId: any): void {
    const _favoriteMovies = localStorage.getItem("favoriteMovies");
    let favoriteMovies = _favoriteMovies ? JSON.parse(_favoriteMovies) : [];
    let movieName = this.movies.filter(movie => movie._id === movieId)[0].Title

    if(favoriteMovies?.includes(movieId)) {
      this.userId && this.fetchApiDataService.deleteMovie(this.userId, movieId).subscribe({next: response => {
        favoriteMovies = favoriteMovies.filter((m:string) => m !== movieId);
        localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));

        this.snackBar.open(`${movieName} has been removed from favorites`, 'OK', {
          duration: 2000
       });
      }, error: error => {
        this.snackBar.open(`${error.error}`, 'OK', {
          duration: 3000
       });
      }})
    } else {
      this.userId && this.fetchApiDataService.addFavoriteMovie(this.userId, movieId).subscribe({next: response => {
        favoriteMovies.push(movieId)
        localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
        this.snackBar.open(`${movieName} has been added to favorites`, 'OK', {
          duration: 2000
       });
      }, error: error => {
        this.snackBar.open(`${error.error}`, 'OK', {
          duration: 3000
       });
      }});
    }
    // this.isFavorite(movieId)
  }
}

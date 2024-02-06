import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss', ]
})
export class MovieCardComponent {
  movies: any[] = []

  public userId = localStorage.getItem("userId");

  constructor(
    public fetchApiDataService: FetchApiDataService, 
    public dialog: MatDialog,
    public snackBar: MatSnackBar,){}

  ngOnInit():void{
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiDataService.getAllMovies().subscribe({next: (response: any) => {
      this.movies = response;      
      return this.movies;
    }, error: () => {}});
  }

  openMovieDialog():void {
    this.dialog.open(MovieCardComponent, {})
  }

  openGenre(genre: any):void {
    this.dialog.open(GenreComponent, {
      width: "100%",
      maxWidth   : '400px',
      maxHeight  : '700px',
      data: genre
    });   
    console.log(genre);
     
  }

  openDirector(director: any):void {
    this.dialog.open(DirectorComponent, {
      width: "100%",
      // maxWidth   : '400px',
      maxHeight  : '700px',
      data: director
    });   
  }

  openSynopsis(synopsis: any):void {
    this.dialog.open(SynopsisComponent, {
      width: "100%",
      // maxWidth   : '400px',
      maxHeight  : '700px',
      data: synopsis
    });   
    console.log(synopsis);
  }

  isFavorite(movieId: any):boolean {
    const favoriteMovies = localStorage.getItem("favoriteMovies");
    return favoriteMovies? favoriteMovies?.includes(movieId) : false;
  }

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

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
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
    public dialog: MatDialog){}

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

  toggleFavorite(movieId: string):void {
    let favoriteMovies = localStorage.getItem("favoriteMovies");
    console.log(favoriteMovies);
    
    if(favoriteMovies?.includes(movieId)) {
      this.userId && this.fetchApiDataService.deleteMovie(this.userId, movieId).subscribe({next: (response: any) => {
        localStorage.removeItem("favoriteMovies");
        // localStorage.setItem("favoriteMovies", favoriteMovies.filter(id => id!==movieId));
        console.log(localStorage.getItem("favoriteMovies"));
        
        // console.log(favoriteMovies?.filter(movie => movie !== movieId));
        
        // localStorage.setItem("favoriteMovies", JSON.stringify()
        // this.isFavorite(movieId);
      }, error: (response) => {console.log(response)}})
    } else {
      this.userId && this.fetchApiDataService.addFavoriteMovie(this.userId, movieId).subscribe({next: (response: any) => {
        console.log(response);
      }, error: (response) => {console.log(response)}})
    }
    
  }


}

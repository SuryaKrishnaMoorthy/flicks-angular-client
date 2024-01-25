import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss', ]
})
export class MovieCardComponent {
  movies: any[] = []
  
  constructor(
    public fetchApiDataService: FetchApiDataService, 
    public dialog: MatDialog){}

  ngOnInit():void{
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiDataService.getAllMovies().subscribe({next: (response: any) => {
      this.movies = response;
      console.log(this.movies);
      
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
    console.log(director);
     
  }


}

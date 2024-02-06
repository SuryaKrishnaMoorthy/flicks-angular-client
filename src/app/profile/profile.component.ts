import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public username: string = "";
  public password: string = "";
  public email: string = "";
  public birthday: Date = new Date();
  public favoriteMovies: any = [];
  public favoriteMoviesIds: Array<string> = [];
  public editMode: boolean = false;
  public userId = localStorage.getItem("userId");

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ){}

  ngOnInit():void{
    this.getUserData();
  }

  getFavoriteMovies():void {
    this.fetchApiData.getAllMovies().subscribe({next: (response: any) => {
      for (let i = 0; i < response.length; i++) {
        for (let j = 0; j < this.favoriteMoviesIds?.length; j++) {
          if (response[i]._id === this.favoriteMoviesIds[j]) {
            this.favoriteMovies.push(response[i]);
          }
        }
      }
    }, error: () => {}});
  }

  getUserData():void{

    this.userId && this.fetchApiData.getUser(this.userId).subscribe({next: (response) => {
      this.username = response.Username;
      this.password = "";
      this.email = response.Email;
      this.birthday = response.Birthday.slice(0,10);
      this.favoriteMoviesIds = response.FavoriteMovies;
      this.getFavoriteMovies();
     }, error: (response) => {
       console.log(response);
     }});
  }

  activateEdit():void{
    this.editMode = true;
  }

  editUser():void {
    const userData = {
      Username: this.username,
      Password: this.password,
      Email: this.email,
      Birthday: this.birthday,
    }

    this.userId && this.fetchApiData.editUser(this.userId, userData).subscribe({next: (response) => {
      this.snackBar.open(`${response.Username}'s profile is edited successfully`, 'OK', {
        duration: 2000
     });
     localStorage.setItem('user', userData.Username);
     this.editMode = false;
    }, error: (error) => {
      console.log(error);
       this.snackBar.open(`Profile edit failed! Please try later`, 'OK', {
        duration: 3000
     });
    }})
  }

  cancelEdit():void {
    this.editMode = false;
  }

  openSynopsis(synopsis: any):void {
    this.dialog.open(SynopsisComponent, {
      width: "100%",
      // maxWidth   : '400px',
      maxHeight  : '700px',
      data: synopsis
    });   
  }

  removeFavorite(movieId: string): void {
    let _favMovies = localStorage.getItem("favoriteMovies");
    let favMovies = _favMovies ? JSON.parse(_favMovies) : [];
    
  this.userId && this.fetchApiData.deleteMovie(this.userId, movieId).subscribe({
    next: (response) => {
      let movieName = this.favoriteMovies?.filter((m:any) => m._id === movieId)[0].Title;
      
      let arr = favMovies.filter((m:string) => m !== movieId);
      localStorage.setItem("favoriteMovies", JSON.stringify(arr));
      this.favoriteMovies = this.favoriteMovies.filter((m:any) => m._id !== movieId);
      
      this.snackBar.open(`${movieName} has been removed from favorites.`, 'OK', {
        duration: 3000
     });
    }, 
    error: (error) => {
      console.log(error);
      this.snackBar.open(`${error.error}`, 'OK', {
        duration: 3000
     });
    }
  })
  }
}


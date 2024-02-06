import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { SynopsisComponent } from '../synopsis/synopsis.component';

/**
 * Component for user profile management.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {
  /**
   * User's username.
   */
  public username: string = "";
  /**
   * User's password.
   */
  public password: string = "";
   /**
   * User's email.
   */
  public email: string = "";
  /**
   * User's birthday.
   */
  public birthday: Date = new Date();
  /**
   * Array of user's favorite movies.
   */
  public favoriteMovies: any = [];
  /**
   * Array of user's favorite movie IDs.
   */
  public favoriteMoviesIds: Array<string> = [];
  /**
   * Flag to indicate edit mode.
   */
  public editMode: boolean = false;
  /**
   * User ID fetched from local storage.
   */
  public userId = localStorage.getItem("userId");

  /**
   * Constructs an instance of ProfileComponent.
   * @param {FetchApiDataService} fetchApiData Service for fetching data from API.
   * @param {MatSnackBar} snackBar Service for displaying notifications to the user from Angular Material.
   * @param {MatDialog} dialog Service for opening dialogs from Angular Material.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ){}
  
  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit():void{
    this.getUserData();
  }

  /**
   * Retrieves user's favorite movies.
   */
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

  /**
   * Retrieves user data.
   */
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

   /**
   * Activates edit mode for profile.
   */
  activateEdit():void{
    this.editMode = true;
  }

  /**
   * Edits user profile.
   */
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

  /**
   * Cancels edit mode for profile.
   */
  cancelEdit():void {
    this.editMode = false;
  }

  /**
   * Opens a dialog to display movie synopsis.
   * @param {any} synopsis Synopsis data of the movie.
   */
  openSynopsis(synopsis: any):void {
    this.dialog.open(SynopsisComponent, {
      width: "100%",
      // maxWidth   : '400px',
      maxHeight  : '700px',
      data: synopsis
    });   
  }

  /**
   * Removes a movie from user's favorite list.
   * @param {string} movieId ID of the movie to be removed.
   */
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


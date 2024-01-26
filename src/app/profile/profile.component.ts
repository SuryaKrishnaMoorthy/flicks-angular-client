import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() public username: string = "";
  @Input() public password: string = "";
  @Input() public email: string = "";
  @Input() public birthday: Date = new Date();
  @Input() public favoriteMovies: any = [];
  public favoriteMoviesIds: Array<string> = [];

  
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
    }, error: (response) => {
      console.log(response);
      
    }})
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
}


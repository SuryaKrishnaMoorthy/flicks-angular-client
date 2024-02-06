import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Component for the user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {
  /**
   * User data input for login.
   */
  @Input() userData = {Username: '', Password: ''};

  /**
   * Constructs an instance of UserLoginFormComponent.
   * @param {FetchApiDataService} fetchApiData Service for fetching data from API.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef Reference to the dialog opened by MatDialog from Angular Material.
   * @param {MatSnackBar} snackBar Service for displaying notifications to the user from Angular Material.
   * @param {Router} router Router for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
    ){}

     /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
    ngOnInit():void {

    }

    /**
   * Sends the user login form data to the backend for authentication.
   * Closes the dialog on success, stores user data in local storage, and navigates to the movies page.
   * Displays an error message on failure.
   */
    loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe({next: (response) => {
        this.dialogRef.close();
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user.Username);
        localStorage.setItem('userId', response.user._id);
        localStorage.setItem('favoriteMovies', JSON.stringify(response.user.FavoriteMovies));
        this.router.navigate(['movies']);
      }, error: (response) => {
        console.log(response);
    
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      }})
    }
}

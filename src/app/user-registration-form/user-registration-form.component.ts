import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

// to display notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * User data input for registration.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructs an instance of UserRegistrationFormComponent.
   * @param {FetchApiDataService} Service for fetching data from API.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef Reference to the dialog opened by MatDialog.
   * @param {MatSnackBar} snackBar Service for displaying notifications to the user.
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * Sends the user registration form data to the backend for registration.
   * Closes the dialog on success and displays a success message.
   * Displays an error message on failure.
   */
  registerUser(): void {
      this.fetchApiData.userRegistration(this.userData).subscribe({next: (response) => {
    // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!

      this.snackBar.open(`${response.Username} registered successfully`, 'OK', {
          duration: 2000
      });
      }, error: (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      }});
    }

  }
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

// to display notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({next: (response) => {
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     console.log(response);
     
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
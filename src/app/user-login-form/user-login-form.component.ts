import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {
  @Input() userData = {Username: '', Password: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
    ){}

    ngOnInit():void {

    }

    loginUser(): void {
      this.fetchApiData.userLogin(this.userData).subscribe({next: (response) => {
        this.dialogRef.close();
        localStorage.setItem('token', response.token);
        console.log(response.token)
      }, error: (response) => {
        console.log(response);
    
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      }})
    }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import {UserLoginFormComponent} from "../user-login-form/user-login-form.component";

/**
 * Component for the welcome page of the application.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {

  /**
   * Constructs an instance of WelcomePageComponent.
   * @param {MatDialog} dialog MatDialog service for opening dialogs.
   */

  constructor(public dialog: MatDialog) { }

  /**
   * Opens the user registration dialog when the signup button is clicked.
   */
  openUserRegistrationDialog(): void {
      this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px'
      });
  }

  /**
   * Opens the user login dialog when the login button is clicked.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {})
  }

}

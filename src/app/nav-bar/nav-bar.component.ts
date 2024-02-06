import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component for navigation bar.
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent {

  /**
   * Constructs an instance of NavBarComponent.
   * @param {Router} router Router for navigation.
   */
  constructor(
    private router: Router,
  ){};
  
  /**
   * Navigates to the home page ('/movies').
   */
  navigateToHome():void{
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to the profile page.
   */
  navigateToProfile():void {
    this.router.navigate(['profile']);
  }

  /**
   * Handles user logout.
   * Removes user-related data from local storage and navigates to the welcome page.
   */
  handleLogout():void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('favoriteMovies');
    this.router.navigate(['welcome']);
  }
}

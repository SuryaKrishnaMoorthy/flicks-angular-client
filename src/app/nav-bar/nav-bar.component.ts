import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(
    private router: Router,
  ){};
  
  navigateToHome():void{
    this.router.navigate(['movies']);
  }

  navigateToProfile():void {
    this.router.navigate(['profile']);
  }

  handleLogout():void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('favoriteMovies');
    this.router.navigate(['welcome']);
  }
}

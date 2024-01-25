import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
 
  constructor(
    public fetchApiData: FetchApiDataService
  ){}

  ngOnInit():void{}

  getUserData():void{
    // this.fetchApiData.getUser(userId);
    
  }
}


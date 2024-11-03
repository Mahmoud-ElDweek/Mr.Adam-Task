import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

@Input() userId : number = 0;
@Input() fName : string = "";
@Input() lName : string = "";
@Input() avatar : string = "";

  constructor(private _router: Router) {}



  goToDetails(userId: number) {
    this._router.navigate(["users", userId])
  }


}

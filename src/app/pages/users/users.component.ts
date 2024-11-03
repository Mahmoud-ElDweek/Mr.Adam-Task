import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserInterface } from '../../interfaces/userInterface';
import { GetUsersService } from '../../services/users/get-users.service';
import { Subscription } from 'rxjs';
import { UserCardComponent } from '../../components/user-card/user-card.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {

  Users : Array<UserInterface> = [];
  page: number = 1;

  private subscription: Subscription = new Subscription();
  constructor(private  _getUsersService:GetUsersService) { }



ngOnInit(): void {
  this.getUsers()
}



  getUsers() {
    const usersSub = this._getUsersService.getPaginatedUsers(this.page).subscribe({
      next: (res) => {
        this.Users = res.data;
        console.log(res);
      },
      error: (err) => {
        console.log("Error Fetching Users", err);
      },
      complete: () => {
        console.log(`Got Users for page ${this.page}`);
      },
    })
    this.subscription.add(usersSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

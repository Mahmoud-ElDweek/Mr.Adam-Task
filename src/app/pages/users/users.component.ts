import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserInterface } from '../../interfaces/userInterface';
import { GetUsersService } from '../../services/users/get-users.service';
import { Subscription } from 'rxjs';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { BreadcrumbComponent } from "../../components/breadcrumb/breadcrumb.component";
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserCardComponent, PaginationComponent, BreadcrumbComponent, LoaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {

  Users : Array<UserInterface> = [];
  page: number = 1;
  pagesCount! : number
  skeletonArray: Array<null> = [null,null,null,null,null,null]

  private subscription: Subscription = new Subscription();
  constructor(private  _getUsersService:GetUsersService) { }



ngOnInit(): void {
  this.getUsers()
}



  getUsers() {
    const usersSub = this._getUsersService.getPaginatedUsers(this.page).subscribe({
      next: (res) => {
        this.Users = res.data;
        this.pagesCount = res.total_pages

        console.log(res);
        console.log(this.pagesCount);
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

  onPageChanged(newPage: number): void {
    console.log("Page changed to:", newPage);
    if (newPage !== this.page) {
      this.page = newPage;
      this.getUsers();
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

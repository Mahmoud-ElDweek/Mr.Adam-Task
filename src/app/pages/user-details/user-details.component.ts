import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GetOneUserService } from '../../services/users/get-one-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from '../../interfaces/userInterface';
import { LoaderComponent } from '../../components/loader/loader.component';
import { NgOptimizedImage } from '@angular/common';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { BackBtnComponent } from '../../components/back-btn/back-btn.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    LoaderComponent,
    NgOptimizedImage,
    BreadcrumbComponent,
    BackBtnComponent,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  id: string | null = null;
  User: UserInterface | null = null;

  route = inject(ActivatedRoute);
  private _subscription: Subscription = new Subscription();
  constructor(private _getOneUserService: GetOneUserService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.getUserDetails();
    });
  }

  getUserDetails() {
    if (this.id) {
      const userDetailsSub = this._getOneUserService
        .getUserById(this.id)
        .subscribe({
          next: (res) => {
            this.User = res.data;
            console.log(this.User);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log(`Got User Id ${this.id}`);
          },
        });
      this._subscription.add(userDetailsSub);
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}

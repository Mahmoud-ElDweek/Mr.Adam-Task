import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserInterface } from '../../interfaces/userInterface';
import { NgOptimizedImage } from '@angular/common';
import { SearchUserByIdService } from '../../services/users/search-user-by-id.service';
import { debounceTime, distinctUntilChanged, Subject, Subscription, switchMap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  userFound: UserInterface | null = null; // Initialize as null to track state better
  userNotFound: string = '';
  private searchSubject = new Subject<string>();
  private subscription = new Subscription();

  constructor(
    private _searchUserByIdService: SearchUserByIdService,
    private _router : Router
  ) {
    const userSub = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((id) =>
          this._searchUserByIdService.searchUserById(id).pipe(
            catchError((err) => {
              this.userFound = null;
              this.userNotFound = 'User not found';
              return of(null);
            })
          )
        )
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.userFound = res.data;
            this.userNotFound = '';
          }
        },
        complete: () => {
          if (this.userFound) {
            console.log(`You searched for ${this.userFound.first_name}`);
          }
        }
      });

    this.subscription.add(userSub);
  }

  ngOnInit(): void {}

  onSearch(event: Event) {
    const id = (event.target as HTMLInputElement).value.trim();
    if (id) {
      this.searchSubject.next(id);
    } else {
      this.clearSearch();
    }
  }

  clearSearch() {
    this.userFound = null;
    this.userNotFound = '';
  }

  navigateToUserDetails(id : number) {
    this._router.navigate([`users/${id}`])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

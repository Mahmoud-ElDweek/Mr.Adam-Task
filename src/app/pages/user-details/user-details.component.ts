import { Component, inject, OnInit } from '@angular/core';
import { GetOneUserService } from '../../services/users/get-one-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInterface } from '../../interfaces/userInterface';
import { LoaderComponent } from "../../components/loader/loader.component";
import { NgOptimizedImage } from '@angular/common';
import { BreadcrumbComponent } from "../../components/breadcrumb/breadcrumb.component";
import { BackBtnComponent } from "../../components/back-btn/back-btn.component";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [LoaderComponent, NgOptimizedImage, BreadcrumbComponent, BackBtnComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {

  id: string | null = null;
  User : UserInterface | null = null;


  route = inject(ActivatedRoute)
  constructor(
    private _getOneUserService: GetOneUserService,
    private _router: Router
  ) { }

ngOnInit(): void {
  this.route.paramMap.subscribe((params)=> {
    this.id = params.get('id');
    this.getUserDetails()
  })
}



  getUserDetails(){
    if(this.id){
      this._getOneUserService.getUserById(this.id).subscribe({
        next: (res) =>{
          this.User = res.data;
          console.log(this.User);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log(`Got User Id ${this.id}`);
        }
      })
    }
  }



}

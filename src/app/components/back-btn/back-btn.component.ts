import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-btn',
  standalone: true,
  imports: [],
  templateUrl: './back-btn.component.html',
  styleUrl: './back-btn.component.scss',
})
export class BackBtnComponent {
  constructor(private _router: Router) {}
  backToUsers() {
    this._router.navigate(['/users']);
  }
}

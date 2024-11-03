import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "users",
    pathMatch: "full",
  },
  {
    path: "users",
    loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent)
  },
  {
    path: "users/:id",
    loadComponent: () => import('./pages/user-details/user-details.component').then(m => m.UserDetailsComponent)
  },
];

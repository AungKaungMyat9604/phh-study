import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
  {
    path: 'signin',
    pathMatch: 'full',
    loadComponent: () =>
      import('./apps/signin/signin.component').then((c) => c.SigninComponent),
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./apps/app-frame/app-frame.module').then((m) => m.AppFrameModule),
  },
];

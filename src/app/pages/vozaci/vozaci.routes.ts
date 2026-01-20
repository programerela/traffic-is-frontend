import { Routes } from '@angular/router';

export const VOZACI_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./vozaci-list/vozaci-list.component').then(m => m.VozaciListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./vozaci-form/vozaci-form.component').then(m => m.VozaciFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./vozaci-detail/vozaci-detail.component').then(m => m.VozaciDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./vozaci-form/vozaci-form.component').then(m => m.VozaciFormComponent)
  }
];
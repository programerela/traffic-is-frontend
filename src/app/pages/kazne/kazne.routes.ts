import { Routes } from '@angular/router';

export const KAZNE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./kazne-list/kazne-list.component').then(m => m.KazneListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./kazne-form/kazne-form.component').then(m => m.KazneFormComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./kazne-form/kazne-form.component').then(m => m.KazneFormComponent)
  }
];
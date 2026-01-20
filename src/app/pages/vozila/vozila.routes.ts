import { Routes } from '@angular/router';

export const VOZILA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./vozila-list/vozila-list.component').then(m => m.VozilaListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./vozila-form/vozila-form.component').then(m => m.VozilaFormComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./vozila-form/vozila-form.component').then(m => m.VozilaFormComponent)
  }
];
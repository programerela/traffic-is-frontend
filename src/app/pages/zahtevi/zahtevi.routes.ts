import { Routes } from '@angular/router';

export const ZAHTEVI_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./zahtevi-list/zahtevi-list.component').then(m => m.ZahteviListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./zahtevi-form/zahtevi-form.component').then(m => m.ZahtevFormComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./zahtevi-form/zahtevi-form.component').then(m => m.ZahtevFormComponent)
  }
];
import { Routes } from '@angular/router';

export const INCIDENTI_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./incidenti-list/incidenti-list.component').then((m) => m.IncidentiListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./incidenti-form/incidenti-form.component').then((m) => m.IncidentiFormComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./incidenti-detail/incidenti-detail.component').then((m) => m.IncidentDetailComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./incidenti-form/incidenti-form.component').then((m) => m.IncidentiFormComponent),
  },
];
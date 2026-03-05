import { Routes } from '@angular/router';
import { canManageUsersGuard } from '../../core/guards/auth.guard';

export const KORISNICI_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./korisnici-list/korisnici-list.component').then((m) => m.KorisniciListComponent),
    canActivate: [canManageUsersGuard],
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./korisnici-form/korisnici-form.component').then((m) => m.KorisniciFormComponent),
    canActivate: [canManageUsersGuard],
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./korisnici-form/korisnici-form.component').then((m) => m.KorisniciFormComponent),
    canActivate: [canManageUsersGuard],
  },
];
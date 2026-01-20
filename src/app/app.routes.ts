// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public routes
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },

  // Protected routes - Main Layout
  {
    path: 'app',
    loadComponent: () => import('./shared/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'vozaci',
        loadChildren: () => import('./pages/vozaci/vozaci.routes').then(m => m.VOZACI_ROUTES)
      },
      {
        path: 'vozila',
        loadChildren: () => import('./pages/vozila/vozila.routes').then(m => m.VOZILA_ROUTES)
      },
      {
        path: 'incidenti',
        loadChildren: () => import('./pages/incidenti/incidenti.routes').then(m => m.INCIDENTI_ROUTES)
      },
      {
        path: 'kazne',
        loadChildren: () => import('./pages/kazne/kazne.routes').then(m => m.KAZNE_ROUTES)
      },
      {
        path: 'signalizacija',
        loadComponent: () => import('./pages/signalizacija/signalizacija-list/signalizacija-list.component').then(m => m.SignalizacijaListComponent)
      },
      {
        path: 'zahtevi',
        loadComponent: () => import('./pages/zahtevi/zahtevi-list/zahtevi-list.component').then(m => m.ZahteviListComponent)
      },
      {
        path: 'obavestenja',
        loadComponent: () => import('./pages/obavestenja/obavestenja-list/obavestenja-list.component').then(m => m.ObavestenjaListComponent)
      },
      {
        path: 'analitika',
        loadComponent: () => import('./pages/analitika/analitika.component').then(m => m.AnalitikaComponent),
        canActivate: [roleGuard(['admin', 'rukovodilac'])]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Default redirects
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
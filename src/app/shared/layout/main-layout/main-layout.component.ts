// src/app/shared/layout/main-layout/main-layout.component.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../../core/services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  sidenavOpened = signal(true);
  
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/app/dashboard' },
    { label: 'Vozači', icon: 'person', route: '/app/vozaci' },
    { label: 'Vozila', icon: 'directions_car', route: '/app/vozila' },
    { label: 'Incidenti', icon: 'warning', route: '/app/incidenti' },
    { label: 'Kazne', icon: 'gavel', route: '/app/kazne' },
    { label: 'Signalizacija', icon: 'traffic', route: '/app/signalizacija' },
    { label: 'Zahtevi', icon: 'assignment', route: '/app/zahtevi' },
    { label: 'Obaveštenja', icon: 'notifications', route: '/app/obavestenja' },
    { 
      label: 'Analitika', 
      icon: 'bar_chart', 
      route: '/app/analitika',
      roles: ['admin', 'rukovodilac']
    }
  ];

  constructor(public authService: AuthService) {}

  toggleSidenav(): void {
    this.sidenavOpened.update(value => !value);
  }

  logout(): void {
    this.authService.logout();
  }

  canViewItem(item: MenuItem): boolean {
    if (!item.roles) return true;
    const user = this.authService.getCurrentUser();
    return user ? item.roles.includes(user.role) : false;
  }

  get currentUser() {
    return this.authService.currentUser();
  }

  get userInitials(): string {
    const user = this.currentUser;
    if (!user) return '';
    return `${user.ime.charAt(0)}${user.prezime.charAt(0)}`.toUpperCase();
  }
}
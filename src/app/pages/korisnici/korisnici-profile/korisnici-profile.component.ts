import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-korisnici-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
  ],
  templateUrl: './korisnici-profile.component.html',
  styleUrls: ['./korisnici-profile.component.css'],
})
export class KorisniciProfileComponent {
  constructor(public authService: AuthService) {}

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get userInitials(): string {
    const user = this.currentUser;
    if (!user) return '';
    return `${user.ime.charAt(0)}${user.prezime.charAt(0)}`.toUpperCase();
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'rukovodilac': return 'Rukovodilac';
      case 'policajac': return 'Policajac';
      default: return role;
    }
  }

  getRoleIcon(role: string): string {
    switch (role) {
      case 'admin': return 'admin_panel_settings';
      case 'rukovodilac': return 'manage_accounts';
      case 'policajac': return 'local_police';
      default: return 'person';
    }
  }

  getRoleColor(role: string): string {
    switch (role) {
      case 'admin': return 'warn';
      case 'rukovodilac': return 'primary';
      case 'policajac': return 'accent';
      default: return 'primary';
    }
  }
}
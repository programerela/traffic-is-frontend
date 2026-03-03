import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClient } from '@angular/common/http';
import { KorisnikDTO } from '../../../models/other.model';
import { PermissionService } from '../../../core/services/premission.service';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-korisnici-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
    MatBadgeModule,
  ],
  templateUrl: './korisnici-list.component.html',
  styleUrls: ['./korisnici-list.component.css'],
})
export class KorisniciListComponent implements OnInit {
  korisnici = signal<KorisnikDTO[]>([]);
  filteredKorisnici = signal<KorisnikDTO[]>([]);
  loading = signal(true);
  displayedColumns = ['idUser', 'ime', 'username', 'role', 'actions'];

  constructor(
    private http: HttpClient,
    public permissionService: PermissionService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadKorisnici();
  }

  loadKorisnici(): void {
    this.loading.set(true);
    this.http.get<KorisnikDTO[]>(`${environment.apiUrl}/korisnici`).subscribe({
      next: (data) => {
        this.korisnici.set(data);
        this.filteredKorisnici.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading.set(false);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filtered = this.korisnici().filter(
      (k) =>
        k.ime.toLowerCase().includes(filterValue) ||
        k.prezime.toLowerCase().includes(filterValue) ||
        k.username.toLowerCase().includes(filterValue) ||
        k.role.toLowerCase().includes(filterValue),
    );
    this.filteredKorisnici.set(filtered);
  }

  getRoleColor(role: string): string {
    switch (role) {
      case 'admin': return 'warn';
      case 'rukovodilac': return 'primary';
      case 'policajac': return 'accent';
      default: return 'primary';
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

  isCurrentUser(korisnik: KorisnikDTO): boolean {
    return this.authService.getCurrentUser()?.idUser === korisnik.idUser;
  }

  deleteKorisnik(id: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovog korisnika?')) {
      this.http.delete(`${environment.apiUrl}/korisnici/${id}`).subscribe({
        next: () => this.loadKorisnici(),
        error: () => alert('Greška pri brisanju korisnika!'),
      });
    }
  }
}
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SignalizacijaService } from '../../../core/services/signalizacija.service';
import { SignalizacijaResponseDTO } from '../../../models/signalizacija.model';
import { PermissionService } from '../../../core/services/premission.service';

@Component({
  selector: 'app-signalizacija-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: './signalizacija-list.component.html',
  styleUrl: './signalizacija-list.component.css',
})
export class SignalizacijaListComponent implements OnInit {
  signalizacije = signal<SignalizacijaResponseDTO[]>([]);
  filteredSignalizacije = signal<SignalizacijaResponseDTO[]>([]);
  loading = signal(true);

  displayedColumns: string[] = [
    'idSignalizacije',
    'lokacija',
    'tipSignalizacije',
    'status',
    'datumPosljednjProvere',
    'actions',
  ];

  constructor(
    private signalizacijaService: SignalizacijaService,
    public permissionService: PermissionService,
  ) {}

  ngOnInit(): void {
    this.loadSignalizacije();
  }

  loadSignalizacije(): void {
    this.loading.set(true);
    this.signalizacijaService.getAllSignalizacija().subscribe({
      next: (data) => {
        this.signalizacije.set(data);
        this.filteredSignalizacije.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading signalizacija:', error);
        this.loading.set(false);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filtered = this.signalizacije().filter(
      (item) =>
        item.lokacija.toLowerCase().includes(filterValue) ||
        item.tipSignalizacije.toLowerCase().includes(filterValue) ||
        item.status.toLowerCase().includes(filterValue),
    );
    this.filteredSignalizacije.set(filtered);
  }

  deleteSignalizacija(id: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovu signalizaciju?')) {
      this.signalizacijaService.deleteSignalizacija(id).subscribe({
        next: () => {
          this.loadSignalizacije();
        },
        error: (error) => {
          console.error('Error deleting signalizacija:', error);
          alert('Greška pri brisanju signalizacije!');
        },
      });
    }
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      ispravna: 'accent',
      'u kvaru': 'warn',
      'u odrzavanju': 'primary',
    };
    return colors[status] || 'primary';
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      ispravna: 'check_circle',
      'u kvaru': 'error',
      'u odrzavanju': 'build',
    };
    return icons[status] || 'info';
  }

  getTipIcon(tip: string): string {
    const icons: { [key: string]: string } = {
      semafor: 'traffic',
      znak: 'warning',
      'svetlo upozorenja': 'lightbulb',
    };
    return icons[tip] || 'traffic';
  }
}

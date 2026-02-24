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
import { ZahtevService } from '../../../core/services/zahtev.service';
import { ZahtevResponseDTO } from '../../../models/other.model';

@Component({
  selector: 'app-zahtevi-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule,
    MatCardModule, MatChipsModule, MatInputModule, MatFormFieldModule,
    MatProgressSpinnerModule, MatTooltipModule
  ],
  templateUrl: `./zahtevi-list.component.html`,
  styleUrls: ['./zahtevi-list.component.css']
})
export class ZahteviListComponent implements OnInit {
  zahtevi = signal<ZahtevResponseDTO[]>([]);
  filteredZahtevi = signal<ZahtevResponseDTO[]>([]);
  loading = signal(true);
  displayedColumns = ['idZahteva', 'datumVreme', 'tipZahteva', 'opis', 'status', 'actions'];

  constructor(private zahtevService: ZahtevService) {}

  ngOnInit(): void {
    this.loadZahtevi();
  }

  loadZahtevi(): void {
    this.loading.set(true);
    this.zahtevService.getAllZahtevi().subscribe({
      next: (data) => {
        this.zahtevi.set(data);
        this.filteredZahtevi.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading.set(false);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filtered = this.zahtevi().filter(z =>
      z.tipZahteva.toLowerCase().includes(filterValue) ||
      (z.opis && z.opis.toLowerCase().includes(filterValue)) ||
      z.status.toLowerCase().includes(filterValue)
    );
    this.filteredZahtevi.set(filtered);
  }

  deleteZahtev(id: number): void {
    if (confirm('Da li ste sigurni?')) {
      this.zahtevService.deleteZahtev(id).subscribe({
        next: () => this.loadZahtevi(),
        error: () => alert('Greška!')
      });
    }
  }

  getStatusColor(status: string): string {
    const colors: {[key: string]: string} = {
      'primljen': 'primary',
      'u obradi': 'accent',
      'resen': 'warn'
    };
    return colors[status] || 'primary';
  }

  getTipIcon(tip: string): string {
    const icons: {[key: string]: string} = {
      'kvar signalizacije': 'warning',
      'zahtev za izvestaj': 'description',
      'prijava gradjanina': 'report'
    };
    return icons[tip] || 'assignment';
  }
}
// src/app/pages/kazne/kazna-detail/kazna-detail.component.ts

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { KazneService } from '../../../core/services/kazne.service';
import { KaznaResponseDTO } from '../../../models/kazna.model';
import { PermissionService } from '../../../core/services/premission.service';

@Component({
  selector: 'app-kazne-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatChipsModule,
  ],
  templateUrl: './kazne-detail.component.html',
  styleUrl: './kazne-detail.component.css',
})
export class KazneDetailComponent implements OnInit {
  kazna = signal<KaznaResponseDTO | null>(null);
  loading = signal(true);
  kaznaId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private kazneService: KazneService,
    public permissionService: PermissionService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.kaznaId = +id;
      this.loadKazna();
    } else {
      this.router.navigate(['/app/kazne']);
    }
  }

  isRokIstekao(): boolean {
    const k = this.kazna();
    if (!k?.rokPlacanja || k.statusPlacanja === 'placena') return false;
    return new Date(k.rokPlacanja) < new Date();
  }

  loadKazna(): void {
    this.loading.set(true);
    this.kazneService.getKazneById(this.kaznaId).subscribe({
      next: (data) => {
        this.kazna.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading kazna:', error);
        alert('Greška pri učitavanju kazne!');
        this.router.navigate(['/app/kazne']);
      },
    });
  }

  deleteKazna(): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovu kaznu?')) {
      this.kazneService.deleteKazna(this.kaznaId).subscribe({
        next: () => {
          alert('Kazna uspešno obrisana!');
          this.router.navigate(['/app/kazne']);
        },
        error: (error) => {
          console.error('Error deleting kazna:', error);
          alert('Greška pri brisanju kazne!');
        },
      });
    }
  }

  markAsPaid(): void {
    const currentKazna = this.kazna();
    if (!currentKazna) return;

    const updatedKazna = {
      datumIzdavanja: currentKazna.datumIzdavanja,
      iznos: currentKazna.iznos,
      opisPrekrsaja: currentKazna.opisPrekrsaja,
      statusPlacanja: 'placena' as const,
      vrstaPrekrsaja: currentKazna.vrstaPrekrsaja,
      idVozaca: currentKazna.idVozaca,
      idIncidenta: currentKazna.idIncidenta,
      rokPlacanja: currentKazna.rokPlacanja,
    };

    this.kazneService.updateKazna(this.kaznaId, updatedKazna).subscribe({
      next: () => {
        alert('Kazna označena kao plaćena!');
        this.loadKazna();
      },
      error: (error) => {
        console.error('Error updating kazna:', error);
        alert('Greška pri ažuriranju kazne!');
      },
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'nije placena': 'warn',
      placena: 'accent',
      'u postupku': 'primary',
    };
    return colors[status] || 'primary';
  }

  getStatusIcon(status: string): string {
    const icons: { [key: string]: string } = {
      'nije placena': 'error',
      placena: 'check_circle',
      'u postupku': 'hourglass_empty',
    };
    return icons[status] || 'info';
  }
}

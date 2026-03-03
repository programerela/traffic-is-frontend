// src/app/pages/vozaci/vozaci-detail/vozaci-detail.component.ts

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VozacService } from '../../../core/services/vozac.service';
import { VoziloService } from '../../../core/services/vozilo.service';
import { PermissionService } from '../../../core/services/premission.service';
import { VozacResponseDTO } from '../../../models/vozac.model';
import { VoziloResponseDTO } from '../../../models/vozilo.model';
import { KazneService } from '../../../core/services/kazne.service';
import { KaznaResponseDTO } from '../../../models/kazna.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-vozaci-detail',
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
    MatTableModule,
    MatTooltipModule,
  ],
  templateUrl: './vozaci-detail.component.html',
  styleUrl: './vozaci-detail.component.css',
})
export class VozaciDetailComponent implements OnInit {
  vozac = signal<VozacResponseDTO | null>(null);
  vozila = signal<VoziloResponseDTO[]>([]);
  kazneVozaca = signal<KaznaResponseDTO[]>([]);
  brojKazni = signal(0);
  loading = signal(true);
  vozilaLoading = signal(true);

  vozacId!: number;
  displayedColumns = ['registracija', 'marka', 'model', 'godiste', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vozacService: VozacService,
    private voziloService: VoziloService,
    private kazneService: KazneService,
    public permissionService: PermissionService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vozacId = +id;
      this.loadAll();
    } else {
      this.router.navigate(['/app/vozaci']);
    }
  }

  loadAll(): void {
    this.loading.set(true);
    forkJoin({
      vozac: this.vozacService.getVozacById(this.vozacId),
      vozila: this.voziloService.getAllVozila(),
      kazne: this.kazneService.getAllKazne(),
    }).subscribe({
      next: ({ vozac, vozila, kazne }) => {
        this.vozac.set(vozac);

        const vozilaVozaca = vozila.filter((v) => v.idVozaca === this.vozacId);
        this.vozila.set(vozilaVozaca);

        const kazneVozaca = kazne.filter((k) => k.idVozaca === this.vozacId);
        this.kazneVozaca.set(kazneVozaca);
        this.brojKazni.set(kazneVozaca.length);

        this.loading.set(false);
        this.vozilaLoading.set(false);
      },
      error: () => {
        alert('Greška pri učitavanju podataka!');
        this.router.navigate(['/app/vozaci']);
      },
    });
  }

  isDozvolaIstekla(): boolean {
    const v = this.vozac();
    if (!v?.datumIstekaDozvole) return false;
    return new Date(v.datumIstekaDozvole) < new Date();
  }

  deleteVozac(): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovog vozača?')) {
      this.vozacService.deleteVozac(this.vozacId).subscribe({
        next: () => {
          alert('Vozač uspešno obrisan!');
          this.router.navigate(['/app/vozaci']);
        },
        error: (error) => {
          console.error('Error deleting vozac:', error);
          alert('Greška pri brisanju vozača!');
        },
      });
    }
  }

  get initials(): string {
    const v = this.vozac();
    if (!v) return '';
    return `${v.ime.charAt(0)}${v.prezime.charAt(0)}`.toUpperCase();
  }
}

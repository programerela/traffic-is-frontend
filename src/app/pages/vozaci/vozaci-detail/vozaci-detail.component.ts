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

@Component({
  selector: 'app-vozaci-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    MatDividerModule, MatChipsModule, MatTableModule, MatTooltipModule
  ],
  templateUrl: './vozaci-detail.component.html',
  styleUrl: './vozaci-detail.component.css'
})
export class VozaciDetailComponent implements OnInit {
  vozac = signal<VozacResponseDTO | null>(null);
  vozila = signal<VoziloResponseDTO[]>([]);
  loading = signal(true);
  vozilaLoading = signal(true);
  
  vozacId!: number;
  displayedColumns = ['registracija', 'marka', 'model', 'godiste', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vozacService: VozacService,
    private voziloService: VoziloService,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vozacId = +id;
      this.loadVozac();
      this.loadVozilaVozaca();
    } else {
      this.router.navigate(['/app/vozaci']);
    }
  }

  isDozvolaIstekla(): boolean {
  const v = this.vozac();
  if (!v?.datumIstekaDozvole) return false;
  return new Date(v.datumIstekaDozvole) < new Date();
}

  loadVozac(): void {
    this.loading.set(true);
    this.vozacService.getVozacById(this.vozacId).subscribe({
      next: (data) => {
        this.vozac.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading vozac:', error);
        alert('Greška pri učitavanju vozača!');
        this.router.navigate(['/app/vozaci']);
      }
    });
  }

  loadVozilaVozaca(): void {
    this.vozilaLoading.set(true);
    // Get all vozila and filter by this vozac
    this.voziloService.getAllVozila().subscribe({
      next: (data) => {
        const vozilaVozaca = data.filter(v => v.idVozaca === this.vozacId);
        this.vozila.set(vozilaVozaca);
        this.vozilaLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading vozila:', error);
        this.vozilaLoading.set(false);
      }
    });
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
        }
      });
    }
  }

  get initials(): string {
    const v = this.vozac();
    if (!v) return '';
    return `${v.ime.charAt(0)}${v.prezime.charAt(0)}`.toUpperCase();
  }
}
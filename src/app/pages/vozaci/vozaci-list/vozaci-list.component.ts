import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { VozacService } from '../../../core/services/vozac.service';
import { VoziloService } from '../../../core/services/vozilo.service';
import { KazneService } from '../../../core/services/kazne.service';
import { VozacResponseDTO } from '../../../models/vozac.model';
import { PermissionService } from '../../../core/services/premission.service';

// Lokalni tip koji proširuje DTO sa izračunatim poljima
interface VozacWithStats extends VozacResponseDTO {
  brojVozila: number;
  brojKazni: number;
}

@Component({
  selector: 'app-vozaci-list',
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
  ],
  templateUrl: './vozaci-list.component.html',
  styleUrls: ['./vozaci-list.component.css'],
})
export class VozaciListComponent implements OnInit {
  vozaci = signal<VozacWithStats[]>([]);
  filteredVozaci = signal<VozacWithStats[]>([]);
  loading = signal(true);
  displayedColumns = ['idVozaca', 'ime', 'jmbg', 'brojVozacke', 'telefon', 'statistika', 'actions'];

  constructor(
    private vozacService: VozacService,
    private voziloService: VoziloService,
    private kazneService: KazneService,
    public permissionService: PermissionService,
  ) {}

  ngOnInit(): void {
    this.loadVozaci();
  }

  loadVozaci(): void {
    this.loading.set(true);

    // Učitaj vozače, vozila i kazne paralelno
    forkJoin({
      vozaci: this.vozacService.getAllVozaci(),
      vozila: this.voziloService.getAllVozila(),
      kazne: this.kazneService.getAllKazne(),
    }).subscribe({
      next: ({ vozaci, vozila, kazne }) => {
        // Izračunaj statistiku po vozaču na frontu
        const vozaciWithStats: VozacWithStats[] = vozaci.map((vozac) => ({
          ...vozac,
          brojVozila: vozila.filter((v) => v.idVozaca === vozac.idVozaca).length,
          brojKazni: kazne.filter((k) => k.idVozaca === vozac.idVozaca).length,
        }));

        this.vozaci.set(vozaciWithStats);
        this.filteredVozaci.set(vozaciWithStats);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Greška pri učitavanju:', error);
        this.loading.set(false);
      },
    });
  }

  isDozvolaIstekla(vozac: VozacResponseDTO): boolean {
    if (!vozac.datumIstekaDozvole) return false;
    return new Date(vozac.datumIstekaDozvole) < new Date();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filtered = this.vozaci().filter(
      (v) =>
        v.ime.toLowerCase().includes(filterValue) ||
        v.prezime.toLowerCase().includes(filterValue) ||
        v.jmbg.includes(filterValue) ||
        v.brojVozacke.toLowerCase().includes(filterValue),
    );
    this.filteredVozaci.set(filtered);
  }

  deleteVozac(id: number): void {
    if (confirm('Da li ste sigurni?')) {
      this.vozacService.deleteVozac(id).subscribe({
        next: () => this.loadVozaci(),
        error: () => alert('Greška pri brisanju!'),
      });
    }
  }
}
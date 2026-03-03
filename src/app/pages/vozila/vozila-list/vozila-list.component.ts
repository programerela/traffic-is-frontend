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
import { VoziloService } from '../../../core/services/vozilo.service';
import { VoziloResponseDTO } from '../../../models/vozilo.model';
import { PermissionService } from '../../../core/services/premission.service';

@Component({
  selector: 'app-vozila-list',
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
  templateUrl: './vozila-list.component.html',
  styleUrls: ['./vozila-list.component.css'],
})
export class VozilaListComponent implements OnInit {
  vozila = signal<VoziloResponseDTO[]>([]);
  filteredVozila = signal<VoziloResponseDTO[]>([]);
  loading = signal(true);

  displayedColumns = ['idVozila', 'vozilo', 'registracija', 'godiste', 'actions'];

  constructor(
    private voziloService: VoziloService,
    public permissionService: PermissionService,
  ) {}

  ngOnInit(): void {
    this.loadVozila();
  }

  loadVozila(): void {
    this.loading.set(true);
    this.voziloService.getAllVozila().subscribe({
      next: (data) => {
        this.vozila.set(data);
        this.filteredVozila.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredVozila.set(
      this.vozila().filter(
        (v) =>
          v.marka.toLowerCase().includes(value) ||
          v.model.toLowerCase().includes(value) ||
          v.registracija.toLowerCase().includes(value),
      ),
    );
  }

  deleteVozilo(id: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete vozilo?')) {
      this.voziloService.deleteVozilo(id).subscribe({
        next: () => this.loadVozila(),
        error: () => alert('Greška prilikom brisanja'),
      });
    }
  }
}

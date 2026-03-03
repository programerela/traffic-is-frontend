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
import { IncidentService } from '../../../core/services/incident.service';
import { IncidentResponseDTO } from '../../../models/incident.model';
import { PermissionService } from '../../../core/services/premission.service';

@Component({
  selector: 'app-incidenti-list',
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
  templateUrl: './incidenti-list.component.html',
  styleUrl: './incidenti-list.component.css',
})
export class IncidentiListComponent implements OnInit {
  incidenti = signal<IncidentResponseDTO[]>([]);
  filteredIncidenti = signal<IncidentResponseDTO[]>([]);
  loading = signal(true);

  displayedColumns: string[] = [
    'idIncidenta',
    'datumVreme',
    'lokacija',
    'tezinaIncidenta',
    'statusIncidenta',
    'vozac',
    'actions',
  ];

  constructor(
    private incidentService: IncidentService,
    public permissionService: PermissionService,
  ) {}

  ngOnInit(): void {
    this.loadIncidenti();
  }

  loadIncidenti(): void {
    this.loading.set(true);
    this.incidentService.getAllIncidenti().subscribe({
      next: (data) => {
        this.incidenti.set(data);
        this.filteredIncidenti.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading incidents:', error);
        this.loading.set(false);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filtered = this.incidenti().filter(
      (incident) =>
        incident.lokacija.toLowerCase().includes(filterValue) ||
        incident.tezinaIncidenta.toLowerCase().includes(filterValue) ||
        incident.statusIncidenta.toLowerCase().includes(filterValue),
    );
    this.filteredIncidenti.set(filtered);
  }

  deleteIncident(id: number): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovaj incident?')) {
      this.incidentService.deleteIncident(id).subscribe({
        next: () => {
          this.loadIncidenti();
        },
        error: (error) => {
          console.error('Error deleting incident:', error);
          alert('Greška pri brisanju incidenta!');
        },
      });
    }
  }

  getTezinaColor(tezina: string): string {
    const colors: { [key: string]: string } = {
      manji: 'accent',
      veci: 'warn',
      'sa povredenima': 'warn',
      'sa poginulima': 'warn',
    };
    return colors[tezina] || 'primary';
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      evidentiran: 'primary',
      obraden: 'accent',
      prosleden: 'warn',
    };
    return colors[status] || 'primary';
  }
}

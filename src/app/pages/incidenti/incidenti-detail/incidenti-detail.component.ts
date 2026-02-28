import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { IncidentService } from '../../../core/services/incident.service';
import { IncidentResponseDTO } from '../../../models/incident.model';

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    MatDividerModule, MatChipsModule, MatTabsModule
  ],
  templateUrl: './incidenti-detail.component.html',
  styleUrl: './incidenti-detail.component.css'
})
export class IncidentDetailComponent implements OnInit {
  incident = signal<IncidentResponseDTO | null>(null);
  loading = signal(true);
  incidentId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private incidentService: IncidentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.incidentId = +id;
      this.loadIncident();
    } else {
      this.router.navigate(['/app/incidenti']);
    }
  }

  loadIncident(): void {
    this.loading.set(true);
    this.incidentService.getIncidentById(this.incidentId).subscribe({
      next: (data) => {
        this.incident.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading incident:', error);
        alert('Greška pri učitavanju incidenta!');
        this.router.navigate(['/app/incidenti']);
      }
    });
  }

  deleteIncident(): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovaj incident?')) {
      this.incidentService.deleteIncident(this.incidentId).subscribe({
        next: () => {
          alert('Incident uspešno obrisan!');
          this.router.navigate(['/app/incidenti']);
        },
        error: (error) => {
          console.error('Error deleting incident:', error);
          alert('Greška pri brisanju incidenta!');
        }
      });
    }
  }

  getTezinaColor(tezina: string): string {
    const colors: {[key: string]: string} = {
      'manji': 'accent',
      'veci': 'warn',
      'sa povredenima': 'warn',
      'sa poginulima': 'warn'
    };
    return colors[tezina] || 'primary';
  }

  getStatusColor(status: string): string {
    const colors: {[key: string]: string} = {
      'evidentiran': 'primary',
      'obraden': 'accent',
      'prosleden': 'warn'
    };
    return colors[status] || 'primary';
  }

  getTezinaIcon(tezina: string): string {
    const icons: {[key: string]: string} = {
      'manji': 'warning',
      'veci': 'error',
      'sa povredenima': 'local_hospital',
      'sa poginulima': 'dangerous'
    };
    return icons[tezina] || 'info';
  }
}
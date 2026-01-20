import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { AnalyticsService } from '../../core/services/analytics.service';
import { IncidentService } from '../../core/services/incident.service';
import { DashboardStatistika } from '../../models/analytics.model';
import { IncidentResponseDTO } from '../../models/incident.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  loading = signal(true);
  statistika = signal<DashboardStatistika | null>(null);
  najnovijiIncidenti = signal<IncidentResponseDTO[]>([]);

  constructor(
    private analyticsService: AnalyticsService,
    private incidentService: IncidentService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading.set(true);

    // Load dashboard statistika
    this.analyticsService.getDashboardStatistika().subscribe({
      next: (data) => {
        this.statistika.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
        this.loading.set(false);
      }
    });

    // Load najnoviji incidenti
    this.incidentService.getNajnovijiIncidenti().subscribe({
      next: (data) => {
        this.najnovijiIncidenti.set(data);
      },
      error: (error) => {
        console.error('Error loading incidents:', error);
      }
    });
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
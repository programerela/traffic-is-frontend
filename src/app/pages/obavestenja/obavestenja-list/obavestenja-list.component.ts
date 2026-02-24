// src/app/pages/obavestenja/obavestenja-list/obavestenja-list.component.ts

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ObavestenjeService } from '../../../core/services/notification.service';
import { ObavestenjeResponseDTO } from '../../../models/other.model';

@Component({
  selector: 'app-obavestenja-list',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule,
    MatChipsModule, MatProgressSpinnerModule, MatTooltipModule
  ],
  templateUrl: `./obavestenja-list.component.html`,
  styleUrls: ['./obavestenja-list.component.css']
})
export class ObavestenjaListComponent implements OnInit {
  obavestenja = signal<ObavestenjeResponseDTO[]>([]);
  loading = signal(true);

  constructor(private obavestenjeService: ObavestenjeService) {}

  ngOnInit(): void {
    this.loadObavestenja();
  }

  loadObavestenja(): void {
    this.loading.set(true);
    this.obavestenjeService.getAllObavestenja().subscribe({
      next: (data) => {
        this.obavestenja.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading.set(false);
      }
    });
  }

  deleteObavestenje(id: number): void {
    if (confirm('Da li ste sigurni da želite da uklonite ovo obaveštenje?')) {
      this.obavestenjeService.deleteObavestenje(id).subscribe({
        next: () => this.loadObavestenja(),
        error: () => alert('Greška!')
      });
    }
  }

  getPrioritetColor(prioritet: string): string {
    const colors: {[key: string]: string} = {
      'visok': 'warn',
      'srednji': 'accent',
      'nizak': 'primary'
    };
    return colors[prioritet] || 'primary';
  }

  getVrstaIcon(vrsta: string): string {
    const icons: {[key: string]: string} = {
      'hitno': 'emergency',
      'saobracajno upozorenje': 'warning',
      'obavestenje': 'info'
    };
    return icons[vrsta] || 'notifications';
  }
}
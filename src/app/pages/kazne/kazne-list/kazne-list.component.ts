// src/app/pages/vozaci/vozaci-list/vozaci-list.component.ts

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
import { KazneService } from '../../../core/services/kazne.service';
import { KaznaResponseDTO } from '../../../models/kazna.model';
import { PermissionService } from '../../../core/services/premission.service';

@Component({
  selector: 'app-kazne-list',
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
  templateUrl: './kazne-list.component.html',
  styleUrls: ['./kazne-list.component.css'],
})
export class KazneListComponent implements OnInit {
  kazne = signal<KaznaResponseDTO[]>([]);
  filteredKazne = signal<KaznaResponseDTO[]>([]);
  loading = signal(true);
  displayedColumns = [
    'idKazne',
    'datumIzdavanja',
    'iznos',
    'opisPrekrsaja',
    'statusPlacanja',
    'vrstaPrekrsaja',
    'idVozaca',
    'actions',
  ];

  constructor(
    private kazneService: KazneService,
    public permissionService: PermissionService,
  ) {}

  ngOnInit(): void {
    this.loadKazne();
  }

  loadKazne(): void {
    this.loading.set(true);
    this.kazneService.getAllKazne().subscribe({
      next: (data) => {
        this.kazne.set(data);
        this.filteredKazne.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading.set(false);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filtered = this.kazne().filter(
      (k) =>
        k.opisPrekrsaja.toLowerCase().includes(filterValue) ||
        k.statusPlacanja.toLowerCase().includes(filterValue) ||
        k.vrstaPrekrsaja.toLowerCase().includes(filterValue) ||
        (k.imeVozaca && k.imeVozaca.toLowerCase().includes(filterValue)) ||
        (k.prezimeVozaca && k.prezimeVozaca.toLowerCase().includes(filterValue)),
    );
    this.filteredKazne.set(filtered);
  }

  deleteKazna(id: number): void {
    if (confirm('Da li ste sigurni?')) {
      this.kazneService.deleteKazna(id).subscribe({
        next: () => this.loadKazne(),
        error: (error) => alert('Greška!'),
      });
    }
  }
}

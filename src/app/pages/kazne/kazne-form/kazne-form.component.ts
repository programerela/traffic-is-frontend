// TEMPLATE ZA SVE PLACEHOLDER KOMPONENTE
// Koristi ovo kao template i samo promeni naziv komponente

// Primer: VozaciListComponent
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kazne-form',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Kazne</h1>
        <button mat-raised-button color="primary" routerLink="new">
          <mat-icon>add</mat-icon>
          Dodaj Kaznu
        </button>
      </div>
      <mat-card>
        <mat-card-content>
          <p>Forma za kaznu će biti ovde...</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .page-container { padding: 1rem; }
    .page-header { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      margin-bottom: 1.5rem; 
    }
    .page-header h1 { 
      font-size: 1.75rem; 
      font-weight: 700; 
      margin: 0; 
    }
  `]
})
export class KazneFormComponent {}

// PRIMENI ISTI TEMPLATE ZA:
// - VozaciFormComponent (promeni template: "Forma za vozača...")
// - VozaciDetailComponent (promeni template: "Detalji vozača...")
// - VozilaListComponent
// - VozilaFormComponent
// - IncidentiListComponent
// - IncidentiFormComponent
// - KazneListComponent
// - KazneFormComponent
// - SignalizacijaListComponent
// - ZahteviListComponent
// - ObavestenjaListComponent
// - AnalitikaComponent
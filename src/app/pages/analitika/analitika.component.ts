import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnalyticsService } from '../../core/services/analytics.service';
import { TopLokacija, TopVozacSaKaznama, PeriodIzvestaj } from '../../models/analytics.model';

@Component({
  selector: 'app-analitika',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule,
    MatProgressSpinnerModule, MatTabsModule, MatSelectModule, MatFormFieldModule
  ],
  templateUrl: './analitika.component.html',
  styleUrl: './analitika.component.css'
})
export class AnalitikaComponent implements OnInit {
  loading = signal(true);
  
  // Top 10 data
  topLokacije = signal<TopLokacija[]>([]);
  topVozaci = signal<TopVozacSaKaznama[]>([]);
  
  // Period data
  mesecniIzvestaj = signal<PeriodIzvestaj | null>(null);
  godisnjiIzvestaj = signal<PeriodIzvestaj | null>(null);
  
  // Selections
  selectedGodina = new Date().getFullYear();
  selectedMesec = new Date().getMonth() + 1;
  
  godine = [2024, 2025, 2026];
  meseci = [
    { value: 1, name: 'Januar' },
    { value: 2, name: 'Februar' },
    { value: 3, name: 'Mart' },
    { value: 4, name: 'April' },
    { value: 5, name: 'Maj' },
    { value: 6, name: 'Jun' },
    { value: 7, name: 'Jul' },
    { value: 8, name: 'Avgust' },
    { value: 9, name: 'Septembar' },
    { value: 10, name: 'Oktobar' },
    { value: 11, name: 'Novembar' },
    { value: 12, name: 'Decembar' }
  ];

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading.set(true);
    
    // Load Top 10 lokacija
    this.analyticsService.getTopLokacije().subscribe({
      next: (data) => this.topLokacije.set(data),
      error: (error) => console.error('Error loading top lokacije:', error)
    });

    // Load Top 10 vozača
    this.analyticsService.getTopVozaciSaKaznama().subscribe({
      next: (data) => this.topVozaci.set(data),
      error: (error) => console.error('Error loading top vozaci:', error)
    });

    // Load mesečni izveštaj
    this.loadMesecniIzvestaj();
    
    // Load godišnji izveštaj
    this.loadGodisnjiIzvestaj();

    this.loading.set(false);
  }

  loadMesecniIzvestaj(): void {
    this.analyticsService.getMesecniIzvestaj(this.selectedGodina, this.selectedMesec).subscribe({
      next: (data) => this.mesecniIzvestaj.set(data),
      error: (error) => console.error('Error loading mesecni izvestaj:', error)
    });
  }

  loadGodisnjiIzvestaj(): void {
    this.analyticsService.getGodisnjiIzvestaj(this.selectedGodina).subscribe({
      next: (data) => this.godisnjiIzvestaj.set(data),
      error: (error) => console.error('Error loading godisnji izvestaj:', error)
    });
  }

  onGodinaChange(): void {
    this.loadMesecniIzvestaj();
    this.loadGodisnjiIzvestaj();
  }

  onMesecChange(): void {
    this.loadMesecniIzvestaj();
  }

  exportReport(type: string): void {
    alert(`Exportovanje ${type} izveštaja...`);
  }
}
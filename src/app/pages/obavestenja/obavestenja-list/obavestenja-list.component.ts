import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { ObavestenjeService } from '../../../core/services/notification.service';
import { ObavestenjeResponseDTO } from '../../../models/other.model';
import { PermissionService } from '../../../core/services/premission.service';

@Component({
  selector: 'app-obavestenja-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
  templateUrl: './obavestenja-list.component.html',
  styleUrls: ['./obavestenja-list.component.css'],
})
export class ObavestenjaListComponent implements OnInit {
  obavestenja = signal<ObavestenjeResponseDTO[]>([]);
  filteredObavestenja = signal<ObavestenjeResponseDTO[]>([]);
  loading = signal(true);
  selectedFilter = 'all';

  onFilterChange(event: any) {
    this.selectedFilter = event.value;
    this.applyFilterByPriority();
  }

  constructor(
    private obavestenjeService: ObavestenjeService,
    public permissionService: PermissionService,
  ) {}

  ngOnInit(): void {
    this.loadObavestenja();
  }

  loadObavestenja(): void {
    this.loading.set(true);
    this.obavestenjeService.getAllObavestenja().subscribe({
      next: (data) => {
        this.obavestenja.set(data);
        this.filteredObavestenja.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading.set(false);
      },
    });
  }

  applyFilterByPriority(): void {
    if (this.selectedFilter === 'all') {
      this.filteredObavestenja.set(this.obavestenja());
    } else {
      const filtered = this.obavestenja().filter((o) => o.prioritet === this.selectedFilter);
      this.filteredObavestenja.set(filtered);
    }
  }

  deleteObavestenje(id: number): void {
    if (confirm('Da li ste sigurni da želite da uklonite ovo obaveštenje?')) {
      this.obavestenjeService.deleteObavestenje(id).subscribe({
        next: () => this.loadObavestenja(),
        error: () => alert('Greška!'),
      });
    }
  }

  getPrioritetIcon(prioritet: string): string {
    const icons: { [key: string]: string } = {
      visok: 'priority_high',
      srednji: 'error_outline',
      nizak: 'info',
    };
    return icons[prioritet] || 'notifications';
  }
}

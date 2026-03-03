import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { VoziloService } from '../../../core/services/vozilo.service';
import { VozacService } from '../../../core/services/vozac.service';
import { VoziloResponseDTO } from '../../../models/vozilo.model';
import { VozacResponseDTO } from '../../../models/vozac.model';
import { PermissionService } from '../../../core/services/premission.service';

@Component({
  selector: 'app-vozila-detail',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    MatDividerModule, MatChipsModule, MatSelectModule, MatFormFieldModule,
    MatDialogModule
  ],
  templateUrl: './vozila-detail.component.html',
  styleUrl: './vozila-detail.component.css'
})
export class VozilaDetailComponent implements OnInit {
  vozilo = signal<VoziloResponseDTO | null>(null);
  vozaci = signal<VozacResponseDTO[]>([]);
  loading = signal(true);
  editingOwner = signal(false);
  
  voziloId!: number;
  ownerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voziloService: VoziloService,
    private vozacService: VozacService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public permissionService: PermissionService
  ) {
    this.ownerForm = this.fb.group({
      idVozaca: [null]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.voziloId = +id;
      this.loadVozilo();
      this.loadVozaci();
    } else {
      this.router.navigate(['/app/vozila']);
    }
  }

  loadVozilo(): void {
    this.loading.set(true);
    this.voziloService.getVoziloById(this.voziloId).subscribe({
      next: (data) => {
        this.vozilo.set(data);
        this.ownerForm.patchValue({ idVozaca: data.idVozaca });
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading vozilo:', error);
        alert('Greška pri učitavanju vozila!');
        this.router.navigate(['/app/vozila']);
      }
    });
  }

  loadVozaci(): void {
    this.vozacService.getAllVozaci().subscribe({
      next: (data) => {
        this.vozaci.set(data);
      },
      error: (error) => console.error('Error loading vozaci:', error)
    });
  }

  toggleOwnerEdit(): void {
    this.editingOwner.update(v => !v);
  }

  saveOwner(): void {
    const newOwnerId = this.ownerForm.value.idVozaca;
    const currentVozilo = this.vozilo();
    
    if (!currentVozilo) return;

    const updatedVozilo = {
      registracija: currentVozilo.registracija,
      marka: currentVozilo.marka,
      model: currentVozilo.model,
      godiste: currentVozilo.godiste,
      idVozaca: newOwnerId
    };

    this.voziloService.updateVozilo(this.voziloId, updatedVozilo).subscribe({
      next: () => {
        alert('Vlasnik uspešno promenjen!');
        this.editingOwner.set(false);
        this.loadVozilo();
      },
      error: (error) => {
        console.error('Error updating owner:', error);
        alert('Greška pri promeni vlasnika!');
      }
    });
  }

  cancelOwnerEdit(): void {
    const currentVozilo = this.vozilo();
    if (currentVozilo) {
      this.ownerForm.patchValue({ idVozaca: currentVozilo.idVozaca });
    }
    this.editingOwner.set(false);
  }

  deleteVozilo(): void {
    if (confirm('Da li ste sigurni da želite da obrišete ovo vozilo?')) {
      this.voziloService.deleteVozilo(this.voziloId).subscribe({
        next: () => {
          alert('Vozilo uspešno obrisano!');
          this.router.navigate(['/app/vozila']);
        },
        error: (error) => {
          console.error('Error deleting vozilo:', error);
          alert('Greška pri brisanju vozila!');
        }
      });
    }
  }

  getVozacFullName(idVozaca: number | null): string {
    if (!idVozaca) return 'Nije dodeljeno';
    const vozac = this.vozaci().find(v => v.idVozaca === idVozaca);
    return vozac ? `${vozac.ime} ${vozac.prezime}` : 'Nepoznat';
  }
}
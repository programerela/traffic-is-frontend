import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { KazneService } from '../../../core/services/kazne.service';
import { VozacService } from '../../../core/services/vozac.service';
import { IncidentService } from '../../../core/services/incident.service';
import { KaznaRequestDTO, StatusPlacanja } from '../../../models/kazna.model';

@Component({
  selector: 'app-kazne-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './kazne-form.component.html',
  styleUrl: './kazne-form.component.css'
})
export class KazneFormComponent implements OnInit {
  kaznaForm: FormGroup;
  isEditMode = false;
  kaznaId?: number;
  loading = false;

  statusOptions: StatusPlacanja[] = ['nije placena', 'placena', 'u postupku'];
  vrstePrekrsaja: string[] = [
    'brza voznja',
    'prolaz na crveno',
    'voznja pod uticajem alkohola',
    'nepropisno parkiranje',
    'koriscenje mobitela',
    'nepostovanje znaka stop',
    'ostalo'
  ];

  vozaci: any[] = [];
  incidenti: any[] = [];

  constructor(
    private fb: FormBuilder,
    private kazneService: KazneService,
    private vozacService: VozacService,
    private incidentService: IncidentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.kaznaForm = this.fb.group({
      datumIzdavanja: [new Date(), Validators.required],
      rokPlacanja: [null],
      iznos: [null, [Validators.required, Validators.min(0)]],
      opisPrekrsaja: ['', Validators.required],
      statusPlacanja: ['nije placena', Validators.required],
      vrstaPrekrsaja: ['', Validators.required],
      idVozaca: [null, Validators.required],
      idIncidenta: [null]
    });
  }

  ngOnInit(): void {
    this.loadVozaci();
    this.loadIncidenti();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.kaznaId = +id;
      this.loadKazna(this.kaznaId);
    }

    // Ako dolazi sa incidenta kroz query param
    const incidentId = this.route.snapshot.queryParamMap.get('incidentId');
    if (incidentId) {
      this.kaznaForm.patchValue({ idIncidenta: +incidentId });
    }

    // Ako dolazi sa vozaca kroz query param
    const vozacId = this.route.snapshot.queryParamMap.get('vozacId');
    if (vozacId) {
      this.kaznaForm.patchValue({ idVozaca: +vozacId });
    }
  }

  loadVozaci(): void {
    this.vozacService.getAllVozaci().subscribe({
      next: (data) => { this.vozaci = data; },
      error: (err) => console.error('Error loading vozaci:', err)
    });
  }

  loadIncidenti(): void {
    this.incidentService.getAllIncidenti().subscribe({
      next: (data) => { this.incidenti = data; },
      error: (err) => console.error('Error loading incidenti:', err)
    });
  }

  loadKazna(id: number): void {
    this.kazneService.getKazneById(id).subscribe({
      next: (kazna) => {
        this.kaznaForm.patchValue({
          datumIzdavanja: new Date(kazna.datumIzdavanja),
          rokPlacanja: kazna.rokPlacanja ? new Date(kazna.rokPlacanja) : null,
          iznos: kazna.iznos,
          opisPrekrsaja: kazna.opisPrekrsaja,
          statusPlacanja: kazna.statusPlacanja,
          vrstaPrekrsaja: kazna.vrstaPrekrsaja,
          idVozaca: kazna.idVozaca,
          idIncidenta: kazna.idIncidenta
        });
      },
      error: (err) => {
        console.error('Error loading kazna:', err);
        alert('Greška pri učitavanju kazne!');
        this.router.navigate(['/app/kazne']);
      }
    });
  }

  onSubmit(): void {
    if (this.kaznaForm.invalid) return;

    this.loading = true;
    const formValue = this.kaznaForm.value;

    const kaznaData: KaznaRequestDTO = {
      ...formValue,
      datumIzdavanja: new Date(formValue.datumIzdavanja).toISOString().split('T')[0],
      rokPlacanja: formValue.rokPlacanja
        ? new Date(formValue.rokPlacanja).toISOString().split('T')[0]
        : null
    };

    const request = this.isEditMode
      ? this.kazneService.updateKazna(this.kaznaId!, kaznaData)
      : this.kazneService.createKazna(kaznaData);

    request.subscribe({
      next: () => {
        this.loading = false;
        alert(this.isEditMode ? 'Kazna uspešno ažurirana!' : 'Kazna uspešno kreirana!');
        this.router.navigate(['/app/kazne']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error saving kazna:', err);
        alert('Greška pri čuvanju kazne!');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/app/kazne']);
  }
}
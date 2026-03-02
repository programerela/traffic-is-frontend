import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IncidentService } from '../../../core/services/incident.service';
import { VozacService } from '../../../core/services/vozac.service';
import { VoziloService } from '../../../core/services/vozilo.service';
import {
  IncidentRequestDTO,
  TezinaIncidenta,
  StatusIncidenta,
} from '../../../models/incident.model';

@Component({
  selector: 'app-incidenti-form',
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
    MatIconModule,
  ],
  templateUrl: './incidenti-form.component.html',
  styleUrl: './incidenti-form.component.css',
})
export class IncidentiFormComponent implements OnInit {
  incidentForm: FormGroup;
  isEditMode = false;
  incidentId?: number;
  loading = false;

  tezinaOptions: TezinaIncidenta[] = ['manji', 'veci', 'sa povredjenima', 'sa poginulima'];
  statusOptions: StatusIncidenta[] = ['evidentiran', 'obradjen', 'prosledjen'];

  vozaci: any[] = [];
  vozila: any[] = [];
  korisnici: any[] = [];

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private vozacService: VozacService,
    private voziloService: VoziloService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.incidentForm = this.fb.group({
      datumVreme: [new Date(), Validators.required],
      lokacija: ['', [Validators.required, Validators.maxLength(150)]],
      opis: [''],
      tezinaIncidenta: ['manji', Validators.required],
      statusIncidenta: ['evidentiran', Validators.required],
      idVozaca: [null],
      idVozila: [null],
      obradioKorisnikId: [null],
      datumObrade: [null],
    });
  }

  ngOnInit(): void {
    // Load vozači i vozila za dropdowns
    this.loadVozaci();
    this.loadVozila();
    this.loadKorisnici();

    // Check if edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.incidentId = +id;
      this.loadIncident(this.incidentId);
    }
  }

  loadVozaci(): void {
    this.vozacService.getAllVozaci().subscribe({
      next: (data) => {
        this.vozaci = data;
      },
      error: (error) => console.error('Error loading vozaci:', error),
    });
  }

  loadVozila(): void {
    this.voziloService.getAllVozila().subscribe({
      next: (data) => {
        this.vozila = data;
      },
      error: (error) => console.error('Error loading vozila:', error),
    });
  }

  loadKorisnici(): void {
    this.http.get<any[]>(`${environment.apiUrl}/korisnici`).subscribe({
      next: (data) => {
        this.korisnici = data;
      },
      error: (err) => console.error('Error loading korisnici:', err),
    });
  }

  loadIncident(id: number): void {
    this.incidentService.getIncidentById(id).subscribe({
      next: (incident) => {
        this.incidentForm.patchValue({
          datumVreme: new Date(incident.datumVreme),
          lokacija: incident.lokacija,
          opis: incident.opis,
          tezinaIncidenta: incident.tezinaIncidenta,
          statusIncidenta: incident.statusIncidenta,
          idVozaca: incident.idVozaca,
          idVozila: incident.idVozila,
          obradioKorisnikId: null,
          datumObrade: incident.datumObrade ? new Date(incident.datumObrade) : null,
        });
      },
      error: (error) => {
        console.error('Error loading incident:', error);
        alert('Greška pri učitavanju incidenta!');
        this.router.navigate(['/app/incidenti']);
      },
    });
  }

  onSubmit(): void {
    if (this.incidentForm.invalid) {
      return;
    }

    this.loading = true;
    const formValue = this.incidentForm.value;

    // Format date to ISO string
    const incidentData: IncidentRequestDTO = {
      ...formValue,
      datumVreme: new Date(formValue.datumVreme).toISOString(),
    };

    const request = this.isEditMode
      ? this.incidentService.updateIncident(this.incidentId!, incidentData)
      : this.incidentService.createIncident(incidentData);

    request.subscribe({
      next: () => {
        this.loading = false;
        alert(this.isEditMode ? 'Incident uspešno ažuriran!' : 'Incident uspešno kreiran!');
        this.router.navigate(['/app/incidenti']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error saving incident:', error);
        alert('Greška pri čuvanju incidenta!');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/app/incidenti']);
  }
}

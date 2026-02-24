import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { ZahtevService } from '../../../core/services/zahtev.service';
import { SignalizacijaService } from '../../../core/services/signalizacija.service';
import { IncidentService } from '../../../core/services/incident.service';
import { ZahtevRequestDTO, TipZahteva, StatusZahteva } from '../../../models/other.model';

@Component({
  selector: 'app-zahtevi-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatStepperModule
  ],
  templateUrl: './zahtevi-form.component.html',
  styleUrl: './zahtevi-form.component.css'
})
export class ZahtevFormComponent implements OnInit {
  zahtevForm: FormGroup;
  isEditMode = false;
  zahtevId?: number;
  loading = false;

  // Pre-selected tip from route params (when coming from Analitika)
  preSelectedTip?: TipZahteva;

  tipZahtevaOptions: TipZahteva[] = [
    'kvar signalizacije',
    'zahtev za izvestaj',
    'prijava gradjanina'
  ];

  statusOptions: StatusZahteva[] = ['primljen', 'u obradi', 'resen'];

  // Report types for "zahtev za izvestaj"
  reportTypes = [
    { value: 'mesecni', label: 'Mesečni Izveštaj Incidenata' },
    { value: 'godisnji', label: 'Godišnji Izveštaj Incidenata' },
    { value: 'lokacija', label: 'Izveštaj po Lokacijama' },
    { value: 'vozaci', label: 'Izveštaj Top Vozača sa Kaznama' },
    { value: 'kazne', label: 'Izveštaj o Kaznama' },
    { value: 'signalizacija', label: 'Izveštaj o Signalizaciji' }
  ];

  signalizacije: any[] = [];
  incidenti: any[] = [];

  constructor(
    private fb: FormBuilder,
    private zahtevService: ZahtevService,
    private signalizacijaService: SignalizacijaService,
    private incidentService: IncidentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.zahtevForm = this.fb.group({
      tipZahteva: ['zahtev za izvestaj', Validators.required],
      opis: ['', Validators.required],
      status: ['primljen', Validators.required],
      idSignalizacije: [null],
      idIncidenta: [null],
      // Additional fields for report requests
      reportType: [''],
      reportPeriod: [''],
      reportNotes: ['']
    });
  }

  ngOnInit(): void {
    // Check if coming from Analitika page with pre-selected type
    this.route.queryParams.subscribe(params => {
      if (params['tip'] === 'izvestaj') {
        this.preSelectedTip = 'zahtev za izvestaj';
        this.zahtevForm.patchValue({ 
          tipZahteva: 'zahtev za izvestaj',
          opis: 'Zahtev za generisanje analitičkog izveštaja'
        });
      }
    });

    // Load data for dropdowns
    this.loadSignalizacije();
    this.loadIncidenti();

    // Check if edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.zahtevId = +id;
      this.loadZahtev(this.zahtevId);
    }

    // Watch tipZahteva changes to show/hide relevant fields
    this.zahtevForm.get('tipZahteva')?.valueChanges.subscribe(tip => {
      this.onTipZahtevaChange(tip);
    });
  }

  loadSignalizacije(): void {
    this.signalizacijaService.getAllSignalizacija().subscribe({
      next: (data) => {
        this.signalizacije = data;
      },
      error: (error) => console.error('Error loading signalizacija:', error)
    });
  }

  loadIncidenti(): void {
    this.incidentService.getAllIncidenti().subscribe({
      next: (data) => {
        this.incidenti = data;
      },
      error: (error) => console.error('Error loading incidenti:', error)
    });
  }

  loadZahtev(id: number): void {
    this.zahtevService.getZahtevById(id).subscribe({
      next: (zahtev) => {
        this.zahtevForm.patchValue({
          tipZahteva: zahtev.tipZahteva,
          opis: zahtev.opis,
          status: zahtev.status,
          idSignalizacije: zahtev.idSignalizacije,
          idIncidenta: zahtev.idIncidenta
        });
      },
      error: (error) => {
        console.error('Error loading zahtev:', error);
        alert('Greška pri učitavanju zahteva!');
        this.router.navigate(['/app/zahtevi']);
      }
    });
  }

  onTipZahtevaChange(tip: TipZahteva): void {
    // Clear optional fields based on type
    if (tip !== 'kvar signalizacije') {
      this.zahtevForm.patchValue({ idSignalizacije: null });
    }
    if (tip !== 'prijava gradjanina') {
      this.zahtevForm.patchValue({ idIncidenta: null });
    }
    
    // Update opis placeholder based on type
    if (tip === 'zahtev za izvestaj' && !this.isEditMode) {
      const reportType = this.zahtevForm.get('reportType')?.value;
      if (reportType) {
        const selectedReport = this.reportTypes.find(r => r.value === reportType);
        this.zahtevForm.patchValue({
          opis: `Zahtev za ${selectedReport?.label}`
        });
      }
    }
  }

  onReportTypeChange(): void {
    const reportType = this.zahtevForm.get('reportType')?.value;
    const selectedReport = this.reportTypes.find(r => r.value === reportType);
    
    if (selectedReport) {
      this.zahtevForm.patchValue({
        opis: `Zahtev za ${selectedReport.label}`
      });
    }
  }

  onSubmit(): void {
    if (this.zahtevForm.invalid) {
      return;
    }

    this.loading = true;
    const formValue = this.zahtevForm.value;
    
    // Build opis with additional details for report requests
    let finalOpis = formValue.opis;
    if (formValue.tipZahteva === 'zahtev za izvestaj') {
      if (formValue.reportType) {
        const reportTypeLabel = this.reportTypes.find(r => r.value === formValue.reportType)?.label;
        finalOpis = `${reportTypeLabel || 'Analitički izveštaj'}`;
        
        if (formValue.reportPeriod) {
          finalOpis += ` - Period: ${formValue.reportPeriod}`;
        }
        if (formValue.reportNotes) {
          finalOpis += ` - Napomena: ${formValue.reportNotes}`;
        }
      }
    }

    const zahtevData: ZahtevRequestDTO = {
      tipZahteva: formValue.tipZahteva,
      opis: finalOpis,
      datumVreme: new Date().toISOString(),
      status: formValue.status,
      idSignalizacije: formValue.idSignalizacije || undefined,
      idIncidenta: formValue.idIncidenta || undefined
    };

    const request = this.isEditMode
      ? this.zahtevService.updateZahtev(this.zahtevId!, zahtevData)
      : this.zahtevService.createZahtev(zahtevData);

    request.subscribe({
      next: () => {
        this.loading = false;
        alert(this.isEditMode ? 'Zahtev uspešno ažuriran!' : 'Zahtev uspešno kreiran!');
        this.router.navigate(['/app/zahtevi']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error saving zahtev:', error);
        alert('Greška pri čuvanju zahteva!');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/app/zahtevi']);
  }

  get isReportRequest(): boolean {
    return this.zahtevForm.get('tipZahteva')?.value === 'zahtev za izvestaj';
  }

  get isSignalDefect(): boolean {
    return this.zahtevForm.get('tipZahteva')?.value === 'kvar signalizacije';
  }

  get isCitizenReport(): boolean {
    return this.zahtevForm.get('tipZahteva')?.value === 'prijava gradjanina';
  }
}
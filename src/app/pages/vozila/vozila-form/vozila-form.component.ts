import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { VoziloService } from '../../../core/services/vozilo.service';
import { VoziloRequestDTO } from '../../../models/vozilo.model';

@Component({
  selector: 'app-vozila-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './vozila-form.component.html',
  styleUrl: './vozila-form.component.css',
})
export class VozilaFormComponent implements OnInit {
  voziloForm: FormGroup;
  isEditMode = false;
  voziloId?: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private voziloService: VoziloService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.voziloForm = this.fb.group({
      marka: ['', Validators.required],
      model: ['', Validators.required],
      registracija: ['', Validators.required],
      godiste: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Check for vozacId in query params
    this.route.queryParams.subscribe((params) => {
      if (params['vozacId']) {
        this.voziloForm.patchValue({
          idVozaca: +params['vozacId'],
        });
      }
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.voziloId = +id;
      this.loadVozilo(this.voziloId);
    }
  }

  loadVozilo(id: number): void {
    this.voziloService.getVoziloById(id).subscribe({
      next: (vozilo) => this.voziloForm.patchValue(vozilo),
      error: () => {
        alert('Greška pri učitavanju vozila');
        this.router.navigate(['/app/vozila']);
      },
    });
  }

  onSubmit(): void {
    if (this.voziloForm.invalid) return;

    this.loading = true;
    const data: VoziloRequestDTO = this.voziloForm.value;

    const request = this.isEditMode
      ? this.voziloService.updateVozilo(this.voziloId!, data)
      : this.voziloService.createVozilo(data);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/app/vozila']);
      },
      error: () => {
        this.loading = false;
        alert('Greška pri čuvanju vozila');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/app/vozila']);
  }
}

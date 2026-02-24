import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { VozacService } from '../../../core/services/vozac.service';
import { VozacRequestDTO } from '../../../models/vozac.model';

@Component({
  selector: 'app-vozaci-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './vozaci-form.component.html',
  styleUrl: './vozaci-form.component.css'
})
export class VozaciFormComponent implements OnInit {
  vozacForm: FormGroup;
  isEditMode = false;
  vozacId?: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private vozacService: VozacService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.vozacForm = this.fb.group({
      ime: ['', [Validators.required, Validators.maxLength(50)]],
      prezime: ['', [Validators.required, Validators.maxLength(50)]],
      jmbg: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      brojVozacke: ['', [Validators.required, Validators.maxLength(20)]],
      adresa: [''],
      telefon: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.vozacId = +id;
      this.loadVozac(this.vozacId);
    }
  }

  loadVozac(id: number): void {
    this.vozacService.getVozacById(id).subscribe({
      next: (vozac) => this.vozacForm.patchValue(vozac),
      error: () => {
        alert('Greška pri učitavanju vozača');
        this.router.navigate(['/app/vozaci']);
      }
    });
  }

  onSubmit(): void {
    if (this.vozacForm.invalid) return;

    this.loading = true;
    const data: VozacRequestDTO = this.vozacForm.value;

    const request = this.isEditMode
      ? this.vozacService.updateVozac(this.vozacId!, data)
      : this.vozacService.createVozac(data);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/app/vozaci']);
      },
      error: () => {
        this.loading = false;
        alert('Greška pri čuvanju vozača');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/app/vozaci']);
  }
}

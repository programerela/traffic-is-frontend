import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-korisnik-form',
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
  ],
  templateUrl: './korisnici-form.component.html',
  styleUrl: './korisnici-form.component.css',
})
export class KorisniciFormComponent implements OnInit {
  korisnikForm: FormGroup;
  isEditMode = false;
  korisnikId?: number;
  loading = false;
  hidePassword = true;

  roleOptions = ['admin', 'policajac', 'rukovodilac'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.korisnikForm = this.fb.group({
      ime: ['', [Validators.required, Validators.maxLength(50)]],
      prezime: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['policajac', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new' && !isNaN(+id)) {
      this.isEditMode = true;
      this.korisnikId = +id;
      this.loadKorisnik(this.korisnikId);
      // Password nije obavezan pri izmeni
      this.korisnikForm.get('password')?.setValidators([Validators.minLength(6)]);
      this.korisnikForm.get('password')?.updateValueAndValidity();
    }
  }

  loadKorisnik(id: number): void {
    this.http.get<any>(`${environment.apiUrl}/korisnici/${id}`).subscribe({
      next: (data) => {
        this.korisnikForm.patchValue({
          ime: data.ime,
          prezime: data.prezime,
          username: data.username,
          role: data.role,
          password: '',
        });
      },
      error: () => {
        alert('Greška pri učitavanju korisnika');
        this.router.navigate(['/app/korisnici']);
      },
    });
  }

  onSubmit(): void {
    if (this.korisnikForm.invalid) return;
    this.loading = true;

    const formValue = this.korisnikForm.value;
    // Pri izmeni, ne šalji password ako je prazan
    const payload: any = { ...formValue };
    if (this.isEditMode && !payload.password) {
      delete payload.password;
    }

    const url = this.isEditMode
      ? `${environment.apiUrl}/korisnici/${this.korisnikId}`
      : `${environment.apiUrl}/korisnici`;
    const request = this.isEditMode ? this.http.put(url, payload) : this.http.post(url, payload);

    request.subscribe({
      next: () => {
        this.loading = false;
        alert(this.isEditMode ? 'Korisnik uspešno ažuriran!' : 'Korisnik uspešno kreiran!');
        this.router.navigate(['/app/korisnici']);
      },
      error: (err) => {
        this.loading = false;
        alert(err.error || 'Greška pri čuvanju korisnika');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/app/korisnici']);
  }
}

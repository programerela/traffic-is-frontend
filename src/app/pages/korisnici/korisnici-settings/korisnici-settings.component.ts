import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-korisnici-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  templateUrl: './korisnici-settings.component.html',
  styleUrls: ['./korisnici-settings.component.css'],
})
export class KorisniciSettingsComponent implements OnInit {
  podaciForm: FormGroup;
  lozinkaForm: FormGroup;
  loadingPodaci = false;
  loadingLozinka = false;
  hideLozinka = true;
  hideNovaLozinka = true;
  hidePotvrda = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    this.podaciForm = this.fb.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      username: ['', Validators.required],
    });

    this.lozinkaForm = this.fb.group({
      novaLozinka: ['', [Validators.required, Validators.minLength(6)]],
      potvrda: ['', Validators.required],
    }, { validators: this.lozinkePoklapaju });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.podaciForm.patchValue({
        ime: user.ime,
        prezime: user.prezime,
        username: user.username,
      });
    }
  }

  lozinkePoklapaju(group: FormGroup) {
    const nova = group.get('novaLozinka')?.value;
    const potvrda = group.get('potvrda')?.value;
    return nova === potvrda ? null : { nepoklapaju: true };
  }

  sacuvajPodatke(): void {
    if (this.podaciForm.invalid) return;
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.loadingPodaci = true;
    const podaci = {
      ...this.podaciForm.value,
      role: user.role,
    };

    this.http.put(`${environment.apiUrl}/korisnici/${user.idUser}`, podaci).subscribe({
      next: (updated: any) => {
        this.loadingPodaci = false;
        // Ažuriraj lokalni user
        const noviUser = { ...user, ...this.podaciForm.value };
        localStorage.setItem('currentUser', JSON.stringify(noviUser));
        this.authService.currentUser.set(noviUser);
        this.snackBar.open('Podaci uspešno sačuvani!', 'OK', { duration: 3000 });
      },
      error: () => {
        this.loadingPodaci = false;
        this.snackBar.open('Greška pri čuvanju podataka!', 'OK', { duration: 3000 });
      },
    });
  }

  promeniLozinku(): void {
    if (this.lozinkaForm.invalid) return;
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.loadingLozinka = true;
    const podaci = {
      ime: user.ime,
      prezime: user.prezime,
      username: user.username,
      role: user.role,
      password: this.lozinkaForm.value.novaLozinka,
    };

    this.http.put(`${environment.apiUrl}/korisnici/${user.idUser}`, podaci).subscribe({
      next: () => {
        this.loadingLozinka = false;
        this.lozinkaForm.reset();
        this.snackBar.open('Lozinka uspešno promenjena!', 'OK', { duration: 3000 });
      },
      error: () => {
        this.loadingLozinka = false;
        this.snackBar.open('Greška pri promeni lozinke!', 'OK', { duration: 3000 });
      },
    });
  }
}
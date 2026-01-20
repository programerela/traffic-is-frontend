// src/app/pages/register/register.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  template: `
    <div class="register-container">
      <div class="register-content">
        <div class="register-header">
          <mat-icon class="police-icon">local_police</mat-icon>
          <h1>Registracija</h1>
          <p>Kreirajte novi nalog</p>
        </div>

        <mat-card class="register-card">
          <mat-card-content>
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Ime</mat-label>
                <input matInput formControlName="ime">
                <mat-error *ngIf="registerForm.get('ime')?.hasError('required')">
                  Ime je obavezno
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Prezime</mat-label>
                <input matInput formControlName="prezime">
                <mat-error *ngIf="registerForm.get('prezime')?.hasError('required')">
                  Prezime je obavezno
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Korisničko ime</mat-label>
                <input matInput formControlName="username">
                <mat-error *ngIf="registerForm.get('username')?.hasError('required')">
                  Korisničko ime je obavezno
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Uloga</mat-label>
                <mat-select formControlName="role">
                  <mat-option value="policajac">Policajac</mat-option>
                  <mat-option value="rukovodilac">Rukovodilac</mat-option>
                  <mat-option value="admin">Admin</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Lozinka</mat-label>
                <input matInput type="password" formControlName="password">
                <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                  Lozinka mora imati najmanje 6 karaktera
                </mat-error>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit" class="full-width" [disabled]="registerForm.invalid">
                Registruj se
              </button>

              <div class="login-link">
                <span>Već imate nalog?</span>
                <a routerLink="/login" mat-button color="primary">Prijavite se</a>
              </div>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    .register-content { width: 100%; max-width: 450px; }
    .register-header { text-align: center; color: white; margin-bottom: 2rem; }
    .police-icon { font-size: 64px; width: 64px; height: 64px; margin-bottom: 1rem; }
    .register-header h1 { font-size: 2rem; font-weight: 700; margin: 0 0 0.5rem 0; }
    .register-header p { font-size: 1.1rem; opacity: 0.9; margin: 0; }
    .register-card { box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2); border-radius: 12px; }
    .full-width { width: 100%; margin-bottom: 1rem; }
    .login-link { text-align: center; margin-top: 1.5rem; color: #666; }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['policajac', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        alert('Registracija uspešna! Sada se možete prijaviti.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        alert('Greška pri registraciji!');
      }
    });
  }
}
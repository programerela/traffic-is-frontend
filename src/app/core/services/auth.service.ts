import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Korisnik, KorisnikDTO } from '../../models/other.model';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token?: string; // Ako budeš dodala JWT
  korisnik: KorisnikDTO;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/korisnici`;
  
  // Signals za reactive state
  currentUser = signal<KorisnikDTO | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Proveri da li postoji sačuvan user u localStorage
    this.loadUserFromStorage();
  }

  // Privremeno - dok ne implementiraš pravi login endpoint
  login(username: string, password: string): Observable<KorisnikDTO> {
    // Ovo bi trebalo da bude POST /api/auth/login
    // Ali pošto backend nema auth endpoint, koristimo GET korisnika po username
    return this.http.get<KorisnikDTO>(`${this.apiUrl}/username/${username}`).pipe(
      tap(korisnik => {
        // Sačuvaj u localStorage
        localStorage.setItem('currentUser', JSON.stringify(korisnik));
        this.currentUser.set(korisnik);
        this.isAuthenticated.set(true);
      })
    );
  }

  register(korisnik: Partial<Korisnik>): Observable<KorisnikDTO> {
    return this.http.post<KorisnikDTO>(this.apiUrl, korisnik);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  getCurrentUser(): KorisnikDTO | null {
    return this.currentUser();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user ? user.role === role : false;
  }
}
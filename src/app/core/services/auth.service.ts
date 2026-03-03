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
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/korisnici`;
  private useMockData = environment.useMockData;

  // Signals za reactive state
  currentUser = signal<KorisnikDTO | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // Proveri da li postoji sačuvan user u localStorage
    this.loadUserFromStorage();
  }

  // MOCK LOGIN - bez API poziva (za development)
  login(username: string, password: string): Observable<KorisnikDTO> {
    // Ako koristimo mock podatke
    if (this.useMockData) {
      return this.mockLogin(username, password);
    }

    // Inače koristi pravi API
    return this.loginWithAPI(username, password);
  }

  private mockLogin(username: string, password: string): Observable<KorisnikDTO> {
    // Mock korisnici
    const mockUsers: KorisnikDTO[] = [
      {
        idUser: 1,
        username: 'admin',
        role: 'admin',
        ime: 'Marko',
        prezime: 'Marković',
      },
      {
        idUser: 2,
        username: 'policajac1',
        role: 'policajac',
        ime: 'Ana',
        prezime: 'Anić',
      },
      {
        idUser: 3,
        username: 'rukovodilac1',
        role: 'rukovodilac',
        ime: 'Petar',
        prezime: 'Petrović',
      },
    ];

    // Simuliraj API delay
    return new Observable((observer) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.username === username);

        // Proveri username i password (svi imaju istu lozinku: password123)
        if (user && password === 'password123') {
          // Sačuvaj u localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser.set(user);
          this.isAuthenticated.set(true);

          observer.next(user);
          observer.complete();
        } else {
          observer.error({ message: 'Pogrešno korisničko ime ili lozinka' });
        }
      }, 500); // 500ms delay da simulira mrežu
    });
  }

  // PRAVI LOGIN - koristi kada pokreneš backend
  private loginWithAPI(username: string, password: string): Observable<KorisnikDTO> {
    return this.http
      .post<KorisnikDTO>(`${this.apiUrl}/korisnici/login`, {
        username,
        password,
      })
      .pipe(
        tap((korisnik) => {
          localStorage.setItem('currentUser', JSON.stringify(korisnik));
          this.currentUser.set(korisnik);
          this.isAuthenticated.set(true);
        }),
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

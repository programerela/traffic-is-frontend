import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vozac, VozacResponseDTO, VozacRequestDTO } from '../../models/vozac.model';

@Injectable({
  providedIn: 'root'
})
export class VozacService {
  private apiUrl = `${environment.apiUrl}/vozaci`;

  constructor(private http: HttpClient) {}

  // GET /api/vozaci
  getAllVozaci(): Observable<VozacResponseDTO[]> {
    return this.http.get<VozacResponseDTO[]>(this.apiUrl);
  }

  // GET /api/vozaci/{id}
  getVozacById(id: number): Observable<VozacResponseDTO> {
    return this.http.get<VozacResponseDTO>(`${this.apiUrl}/${id}`);
  }

  // GET /api/vozaci/jmbg/{jmbg}
  getVozacByJmbg(jmbg: string): Observable<VozacResponseDTO> {
    return this.http.get<VozacResponseDTO>(`${this.apiUrl}/jmbg/${jmbg}`);
  }

  // GET /api/vozaci/vozacka/{broj}
  getVozacByBrojVozacke(broj: string): Observable<VozacResponseDTO> {
    return this.http.get<VozacResponseDTO>(`${this.apiUrl}/vozacka/${broj}`);
  }

  // POST /api/vozaci
  createVozac(vozac: VozacRequestDTO): Observable<VozacResponseDTO> {
    return this.http.post<VozacResponseDTO>(this.apiUrl, vozac);
  }

  // PUT /api/vozaci/{id}
  updateVozac(id: number, vozac: VozacRequestDTO): Observable<VozacResponseDTO> {
    return this.http.put<VozacResponseDTO>(`${this.apiUrl}/${id}`, vozac);
  }

  // DELETE /api/vozaci/{id}
  deleteVozac(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
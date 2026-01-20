import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VoziloResponseDTO, VoziloRequestDTO } from '../../models/vozilo.model';

@Injectable({
  providedIn: 'root'
})
export class VoziloService {
  private apiUrl = `${environment.apiUrl}/vozila`;

  constructor(private http: HttpClient) {}

  getAllVozila(): Observable<VoziloResponseDTO[]> {
    return this.http.get<VoziloResponseDTO[]>(this.apiUrl);
  }

  getVoziloById(id: number): Observable<VoziloResponseDTO> {
    return this.http.get<VoziloResponseDTO>(`${this.apiUrl}/${id}`);
  }

  getVoziloByRegistracija(reg: string): Observable<VoziloResponseDTO> {
    return this.http.get<VoziloResponseDTO>(`${this.apiUrl}/registracija/${reg}`);
  }

  getVozilaByMarka(marka: string): Observable<VoziloResponseDTO[]> {
    return this.http.get<VoziloResponseDTO[]>(`${this.apiUrl}/marka/${marka}`);
  }

  createVozilo(vozilo: VoziloRequestDTO): Observable<VoziloResponseDTO> {
    return this.http.post<VoziloResponseDTO>(this.apiUrl, vozilo);
  }

  updateVozilo(id: number, vozilo: VoziloRequestDTO): Observable<VoziloResponseDTO> {
    return this.http.put<VoziloResponseDTO>(`${this.apiUrl}/${id}`, vozilo);
  }

  deleteVozilo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
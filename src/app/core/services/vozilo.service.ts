import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VoziloResponseDTO, VoziloRequestDTO } from '../../models/vozilo.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class VoziloService {
  private apiUrl = `${environment.apiUrl}/vozila`;
  private useMockData = environment.useMockData;

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService
  ) {}

  getAllVozila(): Observable<VoziloResponseDTO[]> {
    if (this.useMockData) {
      return this.mockDataService.getMockVozila();
    }
    return this.http.get<VoziloResponseDTO[]>(this.apiUrl);
  }

  getVoziloById(id: number): Observable<VoziloResponseDTO> {
    if (this.useMockData) {
      return new Observable(observer => {
        this.mockDataService.getMockVozila().subscribe(vozila => {
          const vozilo = vozila.find(v => v.idVozila === id);
          if (vozilo) {
            observer.next(vozilo);
          } else {
            observer.error({ message: 'Vozilo nije pronađeno' });
          }
          observer.complete();
        });
      });
    }
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
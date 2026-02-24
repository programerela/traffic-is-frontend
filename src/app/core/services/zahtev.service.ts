import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ZahtevRequestDTO, ZahtevResponseDTO } from '../../models/other.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class ZahtevService {
  private apiUrl = `${environment.apiUrl}/zahtevi`;
  private useMockData = environment.useMockData;

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService
  ) {}

  getAllZahtevi(): Observable<ZahtevResponseDTO[]> {
    if (this.useMockData) {
      return this.mockDataService.getMockZahtevi();
    }
    return this.http.get<ZahtevResponseDTO[]>(this.apiUrl);
  }

  getZahtevById(id: number): Observable<ZahtevResponseDTO> {
    if (this.useMockData) {
      return new Observable(observer => {
        this.mockDataService.getMockZahtevi().subscribe(items => {
          const item = items.find(i => i.idZahteva === id);
          if (item) {
            observer.next(item);
          } else {
            observer.error({ message: 'Zahtev nije pronađen' });
          }
          observer.complete();
        });
      });
    }
    return this.http.get<ZahtevResponseDTO>(`${this.apiUrl}/${id}`);
  }

  createZahtev(data: ZahtevRequestDTO): Observable<ZahtevResponseDTO> {
    return this.http.post<ZahtevResponseDTO>(this.apiUrl, data);
  }

  updateZahtev(id: number, data: ZahtevRequestDTO): Observable<ZahtevResponseDTO> {
    return this.http.put<ZahtevResponseDTO>(`${this.apiUrl}/${id}`, data);
  }

  deleteZahtev(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
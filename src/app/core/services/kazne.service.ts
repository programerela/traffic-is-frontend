import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { KaznaResponseDTO, KaznaRequestDTO } from '../../models/kazna.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class KazneService {
  private apiUrl = `${environment.apiUrl}/Kazne`;
  private useMockData = environment.useMockData;

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService
  ) {}

  getAllKazne(): Observable<KaznaResponseDTO[]> {
    if (this.useMockData) {
      return this.mockDataService.getMockKazne();
    }
    return this.http.get<KaznaResponseDTO[]>(this.apiUrl);
  }

  getKazneById(id: number): Observable<KaznaResponseDTO> {
    if (this.useMockData) {
      return new Observable(observer => {
        this.mockDataService.getMockKazne().subscribe(kazne => {
          const kazna = kazne.find(k => k.idKazne === id);
          if (kazna) {
            observer.next(kazna);
          } else {
            observer.error({ message: 'Kazna nije pronađena' });
          }
          observer.complete();
        });
      });
    }
    return this.http.get<KaznaResponseDTO>(`${this.apiUrl}/${id}`);
  }

  getKazneByStatus(status: string): Observable<KaznaResponseDTO[]> {
    return this.http.get<KaznaResponseDTO[]>(`${this.apiUrl}/status/${status}`);
  }

  getKazneByTezina(tezina: string): Observable<KaznaResponseDTO[]> {
    return this.http.get<KaznaResponseDTO[]>(`${this.apiUrl}/tezina/${tezina}`);
  }

  getKazneByLokacija(lokacija: string): Observable<KaznaResponseDTO[]> {
    return this.http.get<KaznaResponseDTO[]>(`${this.apiUrl}/lokacija/${lokacija}`);
  }

  getKazneByPeriod(start: string, end: string): Observable<KaznaResponseDTO[]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<KaznaResponseDTO[]>(`${this.apiUrl}/period`, { params });
  }

  getNajnovijeKazne(): Observable<KaznaResponseDTO[]> {
    if (this.useMockData) {
      return this.mockDataService.getMockKazne();
    }
    return this.http.get<KaznaResponseDTO[]>(`${this.apiUrl}/najnoviji`);
  }

  createKazna(kazna: KaznaRequestDTO): Observable<KaznaResponseDTO> {
    return this.http.post<KaznaResponseDTO>(this.apiUrl, kazna);
  }

  updateKazna(id: number, kazna: KaznaRequestDTO): Observable<KaznaResponseDTO> {
    return this.http.put<KaznaResponseDTO>(`${this.apiUrl}/${id}`, kazna);
  }

  deleteKazna(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
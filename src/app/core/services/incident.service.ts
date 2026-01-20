import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IncidentResponseDTO, IncidentRequestDTO } from '../../models/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private apiUrl = `${environment.apiUrl}/incidenti`;

  constructor(private http: HttpClient) {}

  getAllIncidenti(): Observable<IncidentResponseDTO[]> {
    return this.http.get<IncidentResponseDTO[]>(this.apiUrl);
  }

  getIncidentById(id: number): Observable<IncidentResponseDTO> {
    return this.http.get<IncidentResponseDTO>(`${this.apiUrl}/${id}`);
  }

  getIncidentiByStatus(status: string): Observable<IncidentResponseDTO[]> {
    return this.http.get<IncidentResponseDTO[]>(`${this.apiUrl}/status/${status}`);
  }

  getIncidentiByTezina(tezina: string): Observable<IncidentResponseDTO[]> {
    return this.http.get<IncidentResponseDTO[]>(`${this.apiUrl}/tezina/${tezina}`);
  }

  getIncidentiByLokacija(lokacija: string): Observable<IncidentResponseDTO[]> {
    return this.http.get<IncidentResponseDTO[]>(`${this.apiUrl}/lokacija/${lokacija}`);
  }

  getIncidentiByPeriod(start: string, end: string): Observable<IncidentResponseDTO[]> {
    const params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<IncidentResponseDTO[]>(`${this.apiUrl}/period`, { params });
  }

  getNajnovijiIncidenti(): Observable<IncidentResponseDTO[]> {
    return this.http.get<IncidentResponseDTO[]>(`${this.apiUrl}/najnoviji`);
  }

  createIncident(incident: IncidentRequestDTO): Observable<IncidentResponseDTO> {
    return this.http.post<IncidentResponseDTO>(this.apiUrl, incident);
  }

  updateIncident(id: number, incident: IncidentRequestDTO): Observable<IncidentResponseDTO> {
    return this.http.put<IncidentResponseDTO>(`${this.apiUrl}/${id}`, incident);
  }

  deleteIncident(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
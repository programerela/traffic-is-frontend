import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SignalizacijaResponseDTO, SignalizacijaRequestDTO } from '../../models/signalizacija.model';
import { MockDataService } from './mock-data.service';
import { PermissionService } from './premission.service';

@Injectable({
  providedIn: 'root'
})
export class SignalizacijaService {
  private apiUrl = `${environment.apiUrl}/signalizacija`;
  private useMockData = environment.useMockData;

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService,
    public permissionService: PermissionService
  ) {}

  getAllSignalizacija(): Observable<SignalizacijaResponseDTO[]> {
    if (this.useMockData) {
      return this.mockDataService.getMockSignalizacija();
    }
    return this.http.get<SignalizacijaResponseDTO[]>(this.apiUrl);
  }

  getSignalizacijaById(id: number): Observable<SignalizacijaResponseDTO> {
    if (this.useMockData) {
      return new Observable(observer => {
        this.mockDataService.getMockSignalizacija().subscribe(items => {
          const item = items.find(i => i.idSignalizacije === id);
          if (item) {
            observer.next(item);
          } else {
            observer.error({ message: 'Signalizacija nije pronađena' });
          }
          observer.complete();
        });
      });
    }
    return this.http.get<SignalizacijaResponseDTO>(`${this.apiUrl}/${id}`);
  }

  createSignalizacija(data: SignalizacijaRequestDTO): Observable<SignalizacijaResponseDTO> {
    return this.http.post<SignalizacijaResponseDTO>(this.apiUrl, data);
  }

  updateSignalizacija(id: number, data: SignalizacijaRequestDTO): Observable<SignalizacijaResponseDTO> {
    return this.http.put<SignalizacijaResponseDTO>(`${this.apiUrl}/${id}`, data);
  }

  deleteSignalizacija(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
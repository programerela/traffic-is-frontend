import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ObavestenjeResponseDTO } from '../../models/other.model';
import { MockDataService } from './mock-data.service';
import { PermissionService } from './premission.service';

@Injectable({
  providedIn: 'root'
})
export class ObavestenjeService {
  private apiUrl = `${environment.apiUrl}/obavestenja`;
  private useMockData = environment.useMockData;

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService,
    public permissionService: PermissionService
  ) {}

  getAllObavestenja(): Observable<ObavestenjeResponseDTO[]> {
    if (this.useMockData) {
      return this.mockDataService.getMockObavestenja();
    }
    return this.http.get<ObavestenjeResponseDTO[]>(`${this.apiUrl}/active`);
  }

  getObavestenjeById(id: number): Observable<ObavestenjeResponseDTO> {
    if (this.useMockData) {
      return new Observable(observer => {
        this.mockDataService.getMockObavestenja().subscribe(items => {
          const item = items.find(i => i.idObavestenja === id);
          if (item) {
            observer.next(item);
          } else {
            observer.error({ message: 'Obaveštenje nije pronađeno' });
          }
          observer.complete();
        });
      });
    }
    return this.http.get<ObavestenjeResponseDTO>(`${this.apiUrl}/${id}`);
  }

  deleteObavestenje(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
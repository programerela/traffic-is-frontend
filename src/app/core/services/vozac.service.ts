import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vozac, VozacResponseDTO, VozacRequestDTO } from '../../models/vozac.model';
import { MockDataService } from './mock-data.service';
import { PermissionService } from './premission.service';

@Injectable({
  providedIn: 'root'
})
export class VozacService {
  private apiUrl = `${environment.apiUrl}/vozaci`;
  private useMockData = environment.useMockData;

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService,
    public permissionService: PermissionService
  ) {}

  // GET /api/vozaci
  getAllVozaci(): Observable<VozacResponseDTO[]> {
    if (this.useMockData) {
      return this.mockDataService.getMockVozaci();
    }
    return this.http.get<VozacResponseDTO[]>(this.apiUrl);
  }

  // GET /api/vozaci/{id}
  getVozacById(id: number): Observable<VozacResponseDTO> {
    if (this.useMockData) {
      return new Observable(observer => {
        this.mockDataService.getMockVozaci().subscribe(vozaci => {
          const vozac = vozaci.find(v => v.idVozaca === id);
          if (vozac) {
            observer.next(vozac);
          } else {
            observer.error({ message: 'Vozač nije pronađen' });
          }
          observer.complete();
        });
      });
  }
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
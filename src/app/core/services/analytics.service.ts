// src/app/core/services/analytics.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  DashboardStatistika,
  IncidentStatistikaPoTezini,
  TopLokacija,
  TopVozacSaKaznama,
  PeriodIzvestaj,
  StatistikaPoVrsti,
  SignalizacijaStatistika
} from '../../models/analytics.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = `${environment.apiUrl}/analytics`;
  private useMockData = environment.useMockData;

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService
  ) {}

  // GET /api/analytics/dashboard
  getDashboardStatistika(): Observable<DashboardStatistika> {
    if (this.useMockData) {
      return this.mockDataService.getMockDashboardStatistika();
    }
    return this.http.get<DashboardStatistika>(`${this.apiUrl}/dashboard`);
  }

  // GET /api/analytics/incidenti/tezina
  getIncidentiPoTezini(): Observable<IncidentStatistikaPoTezini[]> {
       if (this.useMockData) {
      return this.mockDataService.getMockIncidentiPoTezini();
    }
    return this.http.get<IncidentStatistikaPoTezini[]>(`${this.apiUrl}/incidenti/tezina`);
  }

  // GET /api/analytics/incidenti/top-lokacije
  getTopLokacije(): Observable<TopLokacija[]> {
       if (this.useMockData) {
      return this.mockDataService.getMockTopLokacije();
    }
    return this.http.get<TopLokacija[]>(`${this.apiUrl}/incidenti/top-lokacije`);
  }

  // GET /api/analytics/vozaci/top-kazne
  getTopVozaciSaKaznama(): Observable<TopVozacSaKaznama[]> {
       if (this.useMockData) {
      return this.mockDataService.getMockTopVozaciSaKaznama();
    }
    return this.http.get<TopVozacSaKaznama[]>(`${this.apiUrl}/vozaci/top-kazne`);
  }

  // GET /api/analytics/izvestaj/mesecni?godina&mesec
  getMesecniIzvestaj(godina: number, mesec: number): Observable<PeriodIzvestaj> {
    const params = new HttpParams().set('godina', godina.toString()).set('mesec', mesec.toString());
    if (this.useMockData) {
      return this.mockDataService.getMockPeriodIzvestaj(godina, mesec);
    }
    return this.http.get<PeriodIzvestaj>(`${this.apiUrl}/izvestaj/mesecni`, { params });
  }

  // GET /api/analytics/izvestaj/godisnji?godina
  getGodisnjiIzvestaj(godina: number): Observable<PeriodIzvestaj> {
    const params = new HttpParams().set('godina', godina.toString());
       if (this.useMockData) {
      return this.mockDataService.getMockPeriodIzvestaj(godina, 1);
    }
    return this.http.get<PeriodIzvestaj>(`${this.apiUrl}/izvestaj/godisnji`, { params });
  }

  // GET /api/analytics/kazne/vrsta
  getKaznePoVrsti(): Observable<StatistikaPoVrsti[]> {
       if (this.useMockData) {
      return this.mockDataService.getMockKaznePoVrsti();
    }
    return this.http.get<StatistikaPoVrsti[]>(`${this.apiUrl}/kazne/vrsta`);
  }

  // GET /api/analytics/kazne/status
  getKaznePoStatusu(): Observable<StatistikaPoVrsti[]> {
    if (this.useMockData) {
      return this.mockDataService.getMockKaznePoStatusu();
    }
    return this.http.get<StatistikaPoVrsti[]>(`${this.apiUrl}/kazne/status`);
  }

  // GET /api/analytics/signalizacija/status
  getSignalizacijaStatistika(): Observable<SignalizacijaStatistika> {
    if (this.useMockData) {
      return this.mockDataService.getMockSignalizacijaStatistika();
    }
    return this.http.get<SignalizacijaStatistika>(`${this.apiUrl}/signalizacija/status`);
  }
}
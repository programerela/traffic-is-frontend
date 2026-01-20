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

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = `${environment.apiUrl}/analytics`;

  constructor(private http: HttpClient) {}

  // GET /api/analytics/dashboard
  getDashboardStatistika(): Observable<DashboardStatistika> {
    return this.http.get<DashboardStatistika>(`${this.apiUrl}/dashboard`);
  }

  // GET /api/analytics/incidenti/tezina
  getIncidentiPoTezini(): Observable<IncidentStatistikaPoTezini[]> {
    return this.http.get<IncidentStatistikaPoTezini[]>(`${this.apiUrl}/incidenti/tezina`);
  }

  // GET /api/analytics/incidenti/top-lokacije
  getTopLokacije(): Observable<TopLokacija[]> {
    return this.http.get<TopLokacija[]>(`${this.apiUrl}/incidenti/top-lokacije`);
  }

  // GET /api/analytics/vozaci/top-kazne
  getTopVozaciSaKaznama(): Observable<TopVozacSaKaznama[]> {
    return this.http.get<TopVozacSaKaznama[]>(`${this.apiUrl}/vozaci/top-kazne`);
  }

  // GET /api/analytics/izvestaj/mesecni?godina&mesec
  getMesecniIzvestaj(godina: number, mesec: number): Observable<PeriodIzvestaj> {
    const params = new HttpParams()
      .set('godina', godina.toString())
      .set('mesec', mesec.toString());
    return this.http.get<PeriodIzvestaj>(`${this.apiUrl}/izvestaj/mesecni`, { params });
  }

  // GET /api/analytics/izvestaj/godisnji?godina
  getGodisnjiIzvestaj(godina: number): Observable<PeriodIzvestaj> {
    const params = new HttpParams().set('godina', godina.toString());
    return this.http.get<PeriodIzvestaj>(`${this.apiUrl}/izvestaj/godisnji`, { params });
  }

  // GET /api/analytics/kazne/vrsta
  getKaznePoVrsti(): Observable<StatistikaPoVrsti[]> {
    return this.http.get<StatistikaPoVrsti[]>(`${this.apiUrl}/kazne/vrsta`);
  }

  // GET /api/analytics/kazne/status
  getKaznePoStatusu(): Observable<StatistikaPoVrsti[]> {
    return this.http.get<StatistikaPoVrsti[]>(`${this.apiUrl}/kazne/status`);
  }

  // GET /api/analytics/signalizacija/status
  getSignalizacijaStatistika(): Observable<SignalizacijaStatistika> {
    return this.http.get<SignalizacijaStatistika>(`${this.apiUrl}/signalizacija/status`);
  }
}
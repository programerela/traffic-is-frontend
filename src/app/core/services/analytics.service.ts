import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  DashboardStatistika,
  IncidentStatistikaPoTezini,
  TopLokacija,
  TopVozacSaKaznama,
  PeriodIzvestaj,
  StatistikaPoVrsti,
  SignalizacijaStatistika,
} from '../../models/analytics.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private apiUrl = `${environment.apiUrl}/analytics`;
  private kazneUrl = `${environment.apiUrl}/kazne`;
  private vozaciUrl = `${environment.apiUrl}/vozaci`;
  private useMockData = environment.useMockData;

  constructor(
    private http: HttpClient,
    private mockDataService: MockDataService,
  ) {}

  getDashboardStatistika(): Observable<DashboardStatistika> {
    if (this.useMockData) return this.mockDataService.getMockDashboardStatistika();
    return this.http.get<DashboardStatistika>(`${this.apiUrl}/dashboard`);
  }

  getIncidentiPoTezini(): Observable<IncidentStatistikaPoTezini[]> {
    if (this.useMockData) return this.mockDataService.getMockIncidentiPoTezini();
    return this.http.get<IncidentStatistikaPoTezini[]>(`${this.apiUrl}/incidenti/tezina`);
  }

  getTopLokacije(): Observable<TopLokacija[]> {
    if (this.useMockData) return this.mockDataService.getMockTopLokacije();
    return this.http.get<any>(`${this.apiUrl}/incidenti/top-lokacije`).pipe(
      map((data) => {
        if (Array.isArray(data)) return data;
        return Object.entries(data).map(([lokacija, brojIncidenata]) => ({
          lokacija,
          brojIncidenata: brojIncidenata as number,
        }));
      }),
    );
  }

  getTopVozaciSaKaznama(): Observable<TopVozacSaKaznama[]> {
    if (this.useMockData) return this.mockDataService.getMockTopVozaciSaKaznama();
    return this.http.get<any>(`${this.apiUrl}/vozaci/top-kazne`).pipe(
      map((data) => {
        const lista = data.top10Vozaca ?? data;
        return lista.map(
          (item: any) =>
            ({
              imeVozaca: item.vozac?.split(' ')[0] ?? '',
              prezimeVozaca: item.vozac?.split(' ')[1] ?? '',
              idVozaca: item.idVozaca,
              brojKazni: item.brojKazni,
              ukupanIznos: item.iznosNeplacenih ?? 0,
            }) as TopVozacSaKaznama,
        );
      }),
    );
  }

  getMesecniIzvestaj(godina: number, mesec: number): Observable<PeriodIzvestaj> {
    const params = new HttpParams().set('godina', godina.toString()).set('mesec', mesec.toString());
    if (this.useMockData) return this.mockDataService.getMockPeriodIzvestaj(godina, mesec);
    return this.http.get<any>(`${this.apiUrl}/izvestaj/mesecni`, { params }).pipe(
      map(
        (data) =>
          ({
            ukupnoIncidenata: data.ukupanBrojIncidenata ?? 0,
            ukupnoKazni: data.ukupnoKazni ?? 0,
            ukupanIznosKazni: data.ukupanIznosKazni ?? 0,
            incidentiPoTezini: data.poTezini ?? {},
            incidentiPoStatusu: data.poStatusu ?? {},
            period: data.period,
          }) as unknown as PeriodIzvestaj,
      ),
    );
  }

  getGodisnjiIzvestaj(godina: number): Observable<PeriodIzvestaj> {
    const params = new HttpParams().set('godina', godina.toString());
    if (this.useMockData) return this.mockDataService.getMockPeriodIzvestaj(godina, 1);
    return this.http.get<any>(`${this.apiUrl}/izvestaj/godisnji`, { params }).pipe(
      map(
        (data) =>
          ({
            ukupnoIncidenata: data.ukupanBrojIncidenata ?? 0,
            ukupnoKazni: data.ukupnoKazni ?? 0,
            ukupanIznosKazni: data.ukupanIznosKazni ?? 0,
            incidentiPoTezini: data.poTezini ?? {},
            incidentiPoStatusu: data.poMesecima ?? {},
            godina: data.godina,
          }) as unknown as PeriodIzvestaj,
      ),
    );
  }

  getKaznePoVrsti(): Observable<StatistikaPoVrsti[]> {
    if (this.useMockData) return this.mockDataService.getMockKaznePoVrsti();
    return this.http.get<StatistikaPoVrsti[]>(`${this.apiUrl}/kazne/vrsta`);
  }

  getKaznePoStatusu(): Observable<StatistikaPoVrsti[]> {
    if (this.useMockData) return this.mockDataService.getMockKaznePoStatusu();
    return this.http.get<StatistikaPoVrsti[]>(`${this.apiUrl}/kazne/status`);
  }

  getSignalizacijaStatistika(): Observable<SignalizacijaStatistika> {
    if (this.useMockData) return this.mockDataService.getMockSignalizacijaStatistika();
    return this.http.get<SignalizacijaStatistika>(`${this.apiUrl}/signalizacija/status`);
  }
}

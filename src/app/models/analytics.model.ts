// Dashboard Statistika
export interface DashboardStatistika {
  ukupnoIncidenata: number;
  ukupnoKazni: number;
  ukupnoVozaca: number;
  ukupnoVozila: number;
  neispravneSignalizacije: number;
  aktivniZahtevi: number;
  incidentiPoTezini: { [key: string]: number };
  kaznePoStatusu: { [key: string]: number };
  najnovijihIncidenata: any[]; // Može biti IncidentResponseDTO[]
}

// Incident Statistika po težini
export interface IncidentStatistikaPoTezini {
  tezina: string;
  broj: number;
}

// Top 10 lokacija
export interface TopLokacija {
  lokacija: string;
  brojIncidenata: number;
}

// Top 10 vozača sa kaznama
export interface TopVozacSaKaznama {
  idVozaca: number;
  imeVozaca: string;
  prezimeVozaca: string;
  brojKazni: number;
  ukupanIznos: number;
}

// Mesečni/Godišnji izveštaj
export interface PeriodIzvestaj {
  period: string;
  ukupnoIncidenata: number;
  incidentiPoTezini: { [key: string]: number };
  ukupnoKazni: number;
  ukupanIznosKazni: number;
  ukupnoPovređenih: number;
  ukupnoPoginulih: number;
}

// Statistika po vrsti
export interface StatistikaPoVrsti {
  vrsta: string;
  broj: number;
}

// Statistika signalizacije
export interface SignalizacijaStatistika {
  ukupno: number;
  ispravne: number;
  uKvaru: number;
  uOdrzavanju: number;
}
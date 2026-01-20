export type TezinaIncidenta = 'manji' | 'veci' | 'sa povredenima' | 'sa poginulima';
export type StatusIncidenta = 'evidentiran' | 'obraden' | 'prosleden';

export interface Incident {
  idIncidenta: number;
  datumVreme: Date | string;
  lokacija: string;
  opis?: string;
  tezinaIncidenta: TezinaIncidenta;
  statusIncidenta: StatusIncidenta;
  idVozaca?: number;
  idVozila?: number;
}

export interface IncidentResponseDTO {
  idIncidenta: number;
  datumVreme: string;
  lokacija: string;
  opis?: string;
  tezinaIncidenta: TezinaIncidenta;
  statusIncidenta: StatusIncidenta;
  idVozaca?: number;
  imeVozaca?: string;
  prezimeVozaca?: string;
  idVozila?: number;
  registracijaVozila?: string;
}

export interface IncidentRequestDTO {
  datumVreme: string;
  lokacija: string;
  opis?: string;
  tezinaIncidenta: TezinaIncidenta;
  statusIncidenta: StatusIncidenta;
  idVozaca?: number;
  idVozila?: number;
}
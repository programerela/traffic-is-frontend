export type TezinaIncidenta = 'manji' | 'veci' | 'sa povredjenima' | 'sa poginulima';
export type StatusIncidenta = 'evidentiran' | 'obradjen' | 'prosledjen';

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
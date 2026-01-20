export type StatusPlacanja = 'nije placena' | 'placena' | 'u postupku';

export interface Kazna {
  idKazne: number;
  datumIzdavanja: Date | string;
  iznos: number;
  opisPrekrsaja: string;
  statusPlacanja: StatusPlacanja;
  vrstaPrekrsaja: string;
  idIncidenta?: number;
  idVozaca: number;
}

export interface KaznaResponseDTO {
  idKazne: number;
  datumIzdavanja: string;
  iznos: number;
  opisPrekrsaja: string;
  statusPlacanja: StatusPlacanja;
  vrstaPrekrsaja: string;
  idIncidenta?: number;
  idVozaca: number;
  imeVozaca?: string;
  prezimeVozaca?: string;
}

export interface KaznaRequestDTO {
  datumIzdavanja: string;
  iznos: number;
  opisPrekrsaja: string;
  statusPlacanja: StatusPlacanja;
  vrstaPrekrsaja: string;
  idIncidenta?: number;
  idVozaca: number;
}
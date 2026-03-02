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
  rokPlacanja?: string;
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
  rokPlacanja?: string;
}

export interface KaznaRequestDTO {
  datumIzdavanja: string;
  iznos: number;
  opisPrekrsaja: string;
  statusPlacanja: StatusPlacanja;
  vrstaPrekrsaja: string;
  idIncidenta?: number;
  idVozaca: number;
  rokPlacanja?: string;
}
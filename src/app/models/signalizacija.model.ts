export type TipSignalizacije = 'semafor' | 'znak' | 'svetlo upozorenja';
export type StatusSignalizacije = 'ispravna' | 'u kvaru' | 'u odrzavanju';

export interface Signalizacija {
  idSignalizacije: number;
  lokacija: string;
  tipSignalizacije: TipSignalizacije;
  status: StatusSignalizacije;
  datumPosljednjProvere?: Date | string;
}

export interface SignalizacijaResponseDTO {
  idSignalizacije: number;
  lokacija: string;
  tipSignalizacije: TipSignalizacije;
  status: StatusSignalizacije;
  datumPosljednjProvere?: string;
}

export interface SignalizacijaRequestDTO {
  lokacija: string;
  tipSignalizacije: TipSignalizacije;
  status: StatusSignalizacije;
  datumPosljednjProvere?: string;
}
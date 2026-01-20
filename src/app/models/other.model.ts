// src/app/models/other.models.ts

// OBAVEŠTENJE
export type VrstaObavestenja = 'saobracajno upozorenje' | 'obavestenje' | 'hitno';
export type Prioritet = 'nizak' | 'srednji' | 'visok';

export interface ObavestenjeResponseDTO {
  idObavestenja: number;
  tekst: string;
  datumVreme: string;
  vrsta: VrstaObavestenja;
  prioritet: Prioritet;
  idIncidenta?: number;
}

// ZAHTEV
export type TipZahteva = 'kvar signalizacije' | 'zahtev za izvestaj' | 'prijava gradjanina';
export type StatusZahteva = 'primljen' | 'u obradi' | 'resen';

export interface Zahtev {
  idZahteva: number;
  tipZahteva: TipZahteva;
  opis?: string;
  datumVreme: Date | string;
  status: StatusZahteva;
  idIncidenta?: number;
  idSignalizacije?: number;
}

export interface ZahtevRequestDTO {
  tipZahteva: TipZahteva;
  opis?: string;
  datumVreme: string;
  status: StatusZahteva;
  idIncidenta?: number;
  idSignalizacije?: number;
}

export interface ZahtevResponseDTO extends Zahtev {
  datumVreme: string;
}

// KORISNIK
export type Role = 'admin' | 'policajac' | 'rukovodilac';

export interface Korisnik {
  idUser: number;
  username: string;
  password?: string; // Samo za kreiranje/update
  role: Role;
  ime: string;
  prezime: string;
}

export interface KorisnikDTO {
  idUser: number;
  username: string;
  role: Role;
  ime: string;
  prezime: string;
}

// ANALITIČKI IZVEŠTAJ
export type TipAnalitike = 'mesecni' | 'godisnji' | 'ad-hoc';

export interface AnalitickiIzvestaj {
  idAnalitike: number;
  tipAnalitike: TipAnalitike;
  datumGenerisanja: Date | string;
  sadrzaj: string;
  idUser: number;
}
export interface Vozac {
  idVozaca: number;
  ime: string;
  prezime: string;
  jmbg: string;
  brojVozacke: string;
  adresa?: string;
  telefon?: string;
}

export interface VozacResponseDTO {
  idVozaca: number;
  ime: string;
  prezime: string;
  jmbg: string;
  brojVozacke: string;
  adresa?: string;
  telefon?: string;
  brojVozila?: number;
  brojKazni?: number;
}

export interface VozacRequestDTO {
  ime: string;
  prezime: string;
  jmbg: string;
  brojVozacke: string;
  adresa?: string;
  telefon?: string;
}
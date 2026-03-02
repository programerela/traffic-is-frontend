export interface Vozac {
  idVozaca: number;
  ime: string;
  prezime: string;
  jmbg: string;
  brojVozacke: string;
  adresa?: string;
  telefon?: string;
  kazneniPoeni?: number;
  datumIstekaDozvole?: string;
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
  kazneniPoeni?: number;
  datumIstekaDozvole?: string;
}

export interface VozacRequestDTO {
  ime: string;
  prezime: string;
  jmbg: string;
  brojVozacke: string;
  adresa?: string;
  telefon?: string;
  datumIstekaDozvole?: string;
}
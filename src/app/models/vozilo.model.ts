export interface Vozilo {
  idVozila: number;
  registracija: string;
  marka: string;
  model: string;
  godiste: number;
  idVozaca: number;
}

export interface VoziloResponseDTO {
  idVozila: number;
  registracija: string;
  marka: string;
  model: string;
  godiste: number;
  idVozaca: number;
  imeVozaca?: string;
  prezimeVozaca?: string;
}

export interface VoziloRequestDTO {
  registracija: string;
  marka: string;
  model: string;
  godiste: number;
  idVozaca: number;
}
// src/app/core/services/mock-data.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  DashboardStatistika,
  IncidentStatistikaPoTezini,
  PeriodIzvestaj,
  SignalizacijaStatistika,
  StatistikaPoVrsti,
  TopLokacija,
  TopVozacSaKaznama,
} from '../../models/analytics.model';
import { IncidentResponseDTO } from '../../models/incident.model';
import { VozacResponseDTO } from '../../models/vozac.model';
import { VoziloResponseDTO } from '../../models/vozilo.model';
import { KaznaResponseDTO } from '../../models/kazna.model';

/**
 * MOCK DATA SERVICE
 * Koristi ovo za development bez backend-a
 * Kada pokreneš backend, jednostavno promeni servise da koriste prave API pozive
 */

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  // Mock Dashboard Statistika
  getMockDashboardStatistika(): Observable<DashboardStatistika> {
    const mockData: DashboardStatistika = {
      ukupnoIncidenata: 156,
      ukupnoKazni: 243,
      ukupnoVozaca: 89,
      ukupnoVozila: 112,
      neispravneSignalizacije: 8,
      aktivniZahtevi: 15,
      incidentiPoTezini: {
        manji: 78,
        veci: 45,
        'sa povredenima': 28,
        'sa poginulima': 5,
      },
      kaznePoStatusu: {
        'nije placena': 98,
        placena: 120,
        'u postupku': 25,
      },
      najnovijihIncidenata: [],
    };

    return of(mockData).pipe(delay(500));
  }

  // Mock Najnoviji Incidenti
  getMockNajnovijiIncidenti(): Observable<IncidentResponseDTO[]> {
    const mockIncidenti: IncidentResponseDTO[] = [
      {
        idIncidenta: 1,
        datumVreme: new Date().toISOString(),
        lokacija: 'Bulevar Oslobođenja 45',
        opis: 'Sudar dva vozila na raskrsnici',
        tezinaIncidenta: 'veci',
        statusIncidenta: 'evidentiran',
        idVozaca: 1,
        imeVozaca: 'Marko',
        prezimeVozaca: 'Marković',
        idVozila: 1,
        registracijaVozila: 'BG-123-AB',
      },
      {
        idIncidenta: 2,
        datumVreme: new Date(Date.now() - 1 * 3600000).toISOString(),
        lokacija: 'Kneza Miloša 12',
        opis: 'Prekoračenje brzine',
        tezinaIncidenta: 'manji',
        statusIncidenta: 'obradjen',
        idVozaca: 2,
        imeVozaca: 'Ana',
        prezimeVozaca: 'Anić',
      },
      {
        idIncidenta: 3,
        datumVreme: new Date(Date.now() - 2 * 3600000).toISOString(),
        lokacija: 'Autoput E-75, km 23',
        opis: 'Teška saobraćajna nezgoda',
        tezinaIncidenta: 'sa povredjenima',
        statusIncidenta: 'prosledjen',
      },
      {
        idIncidenta: 4,
        datumVreme: new Date(Date.now() - 5 * 3600000).toISOString(),
        lokacija: 'Zeleni venac',
        opis: 'Prolazak kroz crveno svetlo',
        tezinaIncidenta: 'manji',
        statusIncidenta: 'evidentiran',
        idVozaca: 4,
        imeVozaca: 'Jelena',
        prezimeVozaca: 'Jovanović',
      },
      {
        idIncidenta: 5,
        datumVreme: new Date(Date.now() - 1 * 86400000).toISOString(),
        lokacija: 'Most na Adi',
        opis: 'Lančani sudar',
        tezinaIncidenta: 'veci',
        statusIncidenta: 'evidentiran',
      },
      {
        idIncidenta: 6,
        datumVreme: new Date(Date.now() - 2 * 86400000).toISOString(),
        lokacija: 'Autoput E-70',
        opis: 'Izletanje vozila sa puta',
        tezinaIncidenta: 'sa povredjenima',
        statusIncidenta: 'prosledjen',
      },
      {
        idIncidenta: 7,
        datumVreme: new Date(Date.now() - 3 * 86400000).toISOString(),
        lokacija: 'Slavija',
        opis: 'Manji sudar',
        tezinaIncidenta: 'manji',
        statusIncidenta: 'obradjen',
      },
      {
        idIncidenta: 8,
        datumVreme: new Date(Date.now() - 4 * 86400000).toISOString(),
        lokacija: 'Ulica Cara Dušana',
        opis: 'Nepropisno skretanje',
        tezinaIncidenta: 'manji',
        statusIncidenta: 'obradjen',
      },
      {
        idIncidenta: 9,
        datumVreme: new Date(Date.now() - 6 * 86400000).toISOString(),
        lokacija: 'Pančevački most',
        opis: 'Sudar sa teretnim vozilom',
        tezinaIncidenta: 'veci',
        statusIncidenta: 'evidentiran',
      },
      {
        idIncidenta: 10,
        datumVreme: new Date(Date.now() - 7 * 86400000).toISOString(),
        lokacija: 'Autoput E-75, km 110',
        opis: 'Smrtni ishod u nezgodi',
        tezinaIncidenta: 'sa poginulima',
        statusIncidenta: 'prosledjen',
      },
    ];

    return of(mockIncidenti).pipe(delay(300));
  }

  // Mock Vozači
  getMockVozaci(): Observable<VozacResponseDTO[]> {
    const mockVozaci: VozacResponseDTO[] = [
      {
        idVozaca: 1,
        ime: 'Marko',
        prezime: 'Marković',
        jmbg: '1234567890123',
        brojVozacke: 'BG123456',
        adresa: 'Beograd',
        telefon: '0691234567',
        brojVozila: 2,
        brojKazni: 3,
      },
      {
        idVozaca: 2,
        ime: 'Ana',
        prezime: 'Anić',
        jmbg: '9876543210987',
        brojVozacke: 'NS789012',
        adresa: 'Novi Sad',
        telefon: '0629876543',
        brojVozila: 1,
        brojKazni: 1,
      },
      {
        idVozaca: 3,
        ime: 'Petar',
        prezime: 'Petrović',
        jmbg: '5555555555555',
        brojVozacke: 'NI456789',
        adresa: 'Niš',
        telefon: '0655555555',
        brojVozila: 1,
        brojKazni: 0,
      },
      {
        idVozaca: 4,
        ime: 'Jelena',
        prezime: 'Jovanović',
        jmbg: '4444444444444',
        brojVozacke: 'BG654321',
        adresa: 'Zemun',
        telefon: '064111222',
        brojVozila: 1,
        brojKazni: 2,
      },
      {
        idVozaca: 5,
        ime: 'Nikola',
        prezime: 'Nikolić',
        jmbg: '3333333333333',
        brojVozacke: 'KG112233',
        adresa: 'Kragujevac',
        telefon: '060333444',
        brojVozila: 2,
        brojKazni: 1,
      },
      {
        idVozaca: 6,
        ime: 'Ivana',
        prezime: 'Ilić',
        jmbg: '2222222222222',
        brojVozacke: 'SU998877',
        adresa: 'Subotica',
        telefon: '061777888',
        brojVozila: 1,
        brojKazni: 0,
      },
      {
        idVozaca: 7,
        ime: 'Milan',
        prezime: 'Milić',
        jmbg: '1111111111111',
        brojVozacke: 'VA445566',
        adresa: 'Valjevo',
        telefon: '063999000',
        brojVozila: 1,
        brojKazni: 4,
      },
      {
        idVozaca: 8,
        ime: 'Sara',
        prezime: 'Savić',
        jmbg: '6666666666666',
        brojVozacke: 'PA121212',
        adresa: 'Pančevo',
        telefon: '065121212',
        brojVozila: 1,
        brojKazni: 0,
      },
      {
        idVozaca: 9,
        ime: 'Luka',
        prezime: 'Lukić',
        jmbg: '7777777777777',
        brojVozacke: 'SM343434',
        adresa: 'Sremska Mitrovica',
        telefon: '064343434',
        brojVozila: 2,
        brojKazni: 2,
      },
      {
        idVozaca: 10,
        ime: 'Teodora',
        prezime: 'Tomić',
        jmbg: '8888888888888',
        brojVozacke: 'BG998877',
        adresa: 'Beograd',
        telefon: '062888999',
        brojVozila: 1,
        brojKazni: 1,
      },
    ];

    return of(mockVozaci).pipe(delay(400));
  }

  // Mock Vozila
  getMockVozila(): Observable<VoziloResponseDTO[]> {
    const mockVozila: VoziloResponseDTO[] = [
      {
        idVozila: 1,
        registracija: 'BG-123-AB',
        marka: 'Volkswagen',
        model: 'Golf',
        godiste: 2019,
        idVozaca: 1,
        imeVozaca: 'Marko',
        prezimeVozaca: 'Marković',
      },
      {
        idVozila: 2,
        registracija: 'NS-456-CD',
        marka: 'Škoda',
        model: 'Octavia',
        godiste: 2020,
        idVozaca: 2,
        imeVozaca: 'Ana',
        prezimeVozaca: 'Anić',
      },
      {
        idVozila: 3,
        registracija: 'NI-789-EF',
        marka: 'Toyota',
        model: 'Corolla',
        godiste: 2021,
        idVozaca: 3,
        imeVozaca: 'Petar',
        prezimeVozaca: 'Petrović',
      },
      {
        idVozila: 4,
        registracija: 'BG-555-GH',
        marka: 'Audi',
        model: 'A4',
        godiste: 2018,
        idVozaca: 4,
        imeVozaca: 'Jelena',
        prezimeVozaca: 'Jovanović',
      },
      {
        idVozila: 5,
        registracija: 'KG-222-IJ',
        marka: 'BMW',
        model: '320d',
        godiste: 2017,
        idVozaca: 5,
        imeVozaca: 'Nikola',
        prezimeVozaca: 'Nikolić',
      },
      {
        idVozila: 6,
        registracija: 'SU-111-KL',
        marka: 'Renault',
        model: 'Clio',
        godiste: 2022,
        idVozaca: 6,
        imeVozaca: 'Ivana',
        prezimeVozaca: 'Ilić',
      },
      {
        idVozila: 7,
        registracija: 'VA-333-MN',
        marka: 'Peugeot',
        model: '308',
        godiste: 2016,
        idVozaca: 7,
        imeVozaca: 'Milan',
        prezimeVozaca: 'Milić',
      },
      {
        idVozila: 8,
        registracija: 'PA-444-OP',
        marka: 'Hyundai',
        model: 'i30',
        godiste: 2020,
        idVozaca: 8,
        imeVozaca: 'Sara',
        prezimeVozaca: 'Savić',
      },
      {
        idVozila: 9,
        registracija: 'SM-777-QR',
        marka: 'Opel',
        model: 'Astra',
        godiste: 2015,
        idVozaca: 9,
        imeVozaca: 'Luka',
        prezimeVozaca: 'Lukić',
      },
      {
        idVozila: 10,
        registracija: 'BG-999-ST',
        marka: 'Tesla',
        model: 'Model 3',
        godiste: 2023,
        idVozaca: 10,
        imeVozaca: 'Teodora',
        prezimeVozaca: 'Tomić',
      },
    ];

    return of(mockVozila).pipe(delay(350));
  }

  // Mock Kazne
  getMockKazne(): Observable<KaznaResponseDTO[]> {
    const mockKazne: KaznaResponseDTO[] = [
      {
        idKazne: 1,
        datumIzdavanja: new Date().toISOString(),
        iznos: 5000,
        opisPrekrsaja: 'Prekoračenje brzine',
        statusPlacanja: 'nije placena',
        vrstaPrekrsaja: 'Brzina',
        idVozaca: 1,
        imeVozaca: 'Marko',
        prezimeVozaca: 'Marković',
      },
      {
        idKazne: 2,
        datumIzdavanja: new Date(Date.now() - 86400000).toISOString(),
        iznos: 3000,
        opisPrekrsaja: 'Nepropisno parkiranje',
        statusPlacanja: 'placena',
        vrstaPrekrsaja: 'Parkiranje',
        idVozaca: 2,
        imeVozaca: 'Ana',
        prezimeVozaca: 'Anić',
      },
      {
        idKazne: 3,
        datumIzdavanja: new Date(Date.now() - 2 * 86400000).toISOString(),
        iznos: 7000,
        opisPrekrsaja: 'Prolazak kroz crveno',
        statusPlacanja: 'u postupku',
        vrstaPrekrsaja: 'Signalizacija',
        idVozaca: 4,
        imeVozaca: 'Jelena',
        prezimeVozaca: 'Jovanović',
      },
      {
        idKazne: 4,
        datumIzdavanja: new Date(Date.now() - 3 * 86400000).toISOString(),
        iznos: 4000,
        opisPrekrsaja: 'Telefon tokom vožnje',
        statusPlacanja: 'placena',
        vrstaPrekrsaja: 'Bezbednost',
        idVozaca: 5,
        imeVozaca: 'Nikola',
        prezimeVozaca: 'Nikolić',
      },
      {
        idKazne: 5,
        datumIzdavanja: new Date(Date.now() - 4 * 86400000).toISOString(),
        iznos: 6000,
        opisPrekrsaja: 'Nepojas',
        statusPlacanja: 'nije placena',
        vrstaPrekrsaja: 'Bezbednost',
        idVozaca: 7,
        imeVozaca: 'Milan',
        prezimeVozaca: 'Milić',
      },
      {
        idKazne: 6,
        datumIzdavanja: new Date(Date.now() - 5 * 86400000).toISOString(),
        iznos: 2000,
        opisPrekrsaja: 'Svetla ugašena',
        statusPlacanja: 'placena',
        vrstaPrekrsaja: 'Oprema',
        idVozaca: 8,
        imeVozaca: 'Sara',
        prezimeVozaca: 'Savić',
      },
      {
        idKazne: 7,
        datumIzdavanja: new Date(Date.now() - 6 * 86400000).toISOString(),
        iznos: 8000,
        opisPrekrsaja: 'Alkohol',
        statusPlacanja: 'u postupku',
        vrstaPrekrsaja: 'Alkohol',
        idVozaca: 9,
        imeVozaca: 'Luka',
        prezimeVozaca: 'Lukić',
      },
      {
        idKazne: 8,
        datumIzdavanja: new Date(Date.now() - 7 * 86400000).toISOString(),
        iznos: 3500,
        opisPrekrsaja: 'Nepostovanje znaka',
        statusPlacanja: 'placena',
        vrstaPrekrsaja: 'Signalizacija',
        idVozaca: 10,
        imeVozaca: 'Teodora',
        prezimeVozaca: 'Tomić',
      },
      {
        idKazne: 9,
        datumIzdavanja: new Date(Date.now() - 8 * 86400000).toISOString(),
        iznos: 4500,
        opisPrekrsaja: 'Preticanje',
        statusPlacanja: 'nije placena',
        vrstaPrekrsaja: 'Preticanje',
        idVozaca: 1,
        imeVozaca: 'Marko',
        prezimeVozaca: 'Marković',
      },
      {
        idKazne: 10,
        datumIzdavanja: new Date(Date.now() - 9 * 86400000).toISOString(),
        iznos: 2500,
        opisPrekrsaja: 'Pojas',
        statusPlacanja: 'placena',
        vrstaPrekrsaja: 'Bezbednost',
        idVozaca: 3,
        imeVozaca: 'Petar',
        prezimeVozaca: 'Petrović',
      },
    ];

    return of(mockKazne).pipe(delay(300));
  }

  // Mock Signalizacija
  getMockSignalizacija(): Observable<any[]> {
    const mockSignalizacija = [
      {
        idSignalizacije: 1,
        lokacija: 'Bulevar Oslobođenja - Trg Republike',
        tipSignalizacije: 'semafor',
        status: 'ispravna',
        datumPosljednjProvere: new Date(Date.now() - 7 * 86400000).toISOString(),
      },
      {
        idSignalizacije: 2,
        lokacija: 'Autoput E-75, km 45',
        tipSignalizacije: 'znak',
        status: 'ispravna',
        datumPosljednjProvere: new Date(Date.now() - 5 * 86400000).toISOString(),
      },
      {
        idSignalizacije: 3,
        lokacija: 'Kneza Miloša 23',
        tipSignalizacije: 'semafor',
        status: 'u kvaru',
        datumPosljednjProvere: new Date(Date.now() - 1 * 86400000).toISOString(),
      },
      {
        idSignalizacije: 4,
        lokacija: 'Ulica Kralja Petra',
        tipSignalizacije: 'svetlo upozorenja',
        status: 'u odrzavanju',
        datumPosljednjProvere: new Date().toISOString(),
      },
      {
        idSignalizacije: 5,
        lokacija: 'Most na Adi',
        tipSignalizacije: 'semafor',
        status: 'ispravna',
        datumPosljednjProvere: new Date(Date.now() - 10 * 86400000).toISOString(),
      },
      {
        idSignalizacije: 6,
        lokacija: 'Slavija',
        tipSignalizacije: 'znak',
        status: 'ispravna',
        datumPosljednjProvere: new Date(Date.now() - 4 * 86400000).toISOString(),
      },
      {
        idSignalizacije: 7,
        lokacija: 'Pančevački most',
        tipSignalizacije: 'semafor',
        status: 'u kvaru',
        datumPosljednjProvere: new Date(Date.now() - 2 * 86400000).toISOString(),
      },
      {
        idSignalizacije: 8,
        lokacija: 'Autoput E-70, km 18',
        tipSignalizacije: 'znak',
        status: 'ispravna',
        datumPosljednjProvere: new Date(Date.now() - 8 * 86400000).toISOString(),
      },
      {
        idSignalizacije: 9,
        lokacija: 'Zeleni venac',
        tipSignalizacije: 'semafor',
        status: 'u odrzavanju',
        datumPosljednjProvere: new Date(Date.now() - 1 * 86400000).toISOString(),
      },
      {
        idSignalizacije: 10,
        lokacija: 'Bulevar kralja Aleksandra',
        tipSignalizacije: 'svetlo upozorenja',
        status: 'ispravna',
        datumPosljednjProvere: new Date(Date.now() - 6 * 86400000).toISOString(),
      },
    ];

    return of(mockSignalizacija).pipe(delay(350));
  }

  // Mock Zahtevi
  getMockZahtevi(): Observable<any[]> {
    const mockZahtevi = [
      {
        idZahteva: 1,
        tipZahteva: 'kvar signalizacije',
        opis: 'Semafor ne radi na raskrsnici',
        datumVreme: new Date().toISOString(),
        status: 'u obradi',
        idSignalizacije: 3,
      },
      {
        idZahteva: 2,
        tipZahteva: 'zahtev za izvestaj',
        opis: 'Mesečni izveštaj o incidentima',
        datumVreme: new Date(Date.now() - 1 * 86400000).toISOString(),
        status: 'primljen',
      },
      {
        idZahteva: 3,
        tipZahteva: 'prijava gradjanina',
        opis: 'Oštećen znak na autoputu',
        datumVreme: new Date(Date.now() - 2 * 86400000).toISOString(),
        status: 'resen',
        idSignalizacije: 2,
      },
      {
        idZahteva: 4,
        tipZahteva: 'kvar signalizacije',
        opis: 'Semafor treperi na Slaviji',
        datumVreme: new Date(Date.now() - 3 * 86400000).toISOString(),
        status: 'u obradi',
        idSignalizacije: 7,
      },
      {
        idZahteva: 5,
        tipZahteva: 'prijava gradjanina',
        opis: 'Nepregledna signalizacija kod mosta',
        datumVreme: new Date(Date.now() - 4 * 86400000).toISOString(),
        status: 'primljen',
        idSignalizacije: 5,
      },
      {
        idZahteva: 6,
        tipZahteva: 'zahtev za izvestaj',
        opis: 'Godišnja statistika kazni',
        datumVreme: new Date(Date.now() - 5 * 86400000).toISOString(),
        status: 'resen',
      },
      {
        idZahteva: 7,
        tipZahteva: 'kvar signalizacije',
        opis: 'Ne radi svetlo upozorenja',
        datumVreme: new Date(Date.now() - 6 * 86400000).toISOString(),
        status: 'u obradi',
        idSignalizacije: 10,
      },
      {
        idZahteva: 8,
        tipZahteva: 'prijava gradjanina',
        opis: 'Znak okrenut u pogrešnom smeru',
        datumVreme: new Date(Date.now() - 7 * 86400000).toISOString(),
        status: 'resen',
        idSignalizacije: 8,
      },
      {
        idZahteva: 9,
        tipZahteva: 'zahtev za izvestaj',
        opis: 'Izveštaj o bezbednosti saobraćaja',
        datumVreme: new Date(Date.now() - 8 * 86400000).toISOString(),
        status: 'primljen',
      },
      {
        idZahteva: 10,
        tipZahteva: 'kvar signalizacije',
        opis: 'Semafor ne reaguje na pešake',
        datumVreme: new Date(Date.now() - 9 * 86400000).toISOString(),
        status: 'u obradi',
        idSignalizacije: 9,
      },
    ];

    return of(mockZahtevi).pipe(delay(300));
  }

  // Mock Obaveštenja
  getMockObavestenja(): Observable<any[]> {
    const mockObavestenja = [
      {
        idObavestenja: 1,
        tekst: 'HITNO: Teška saobraćajna nesreća na autoputu E-75.',
        datumVreme: new Date().toISOString(),
        vrsta: 'hitno',
        prioritet: 'visok',
        idIncidenta: 10,
      },
      {
        idObavestenja: 2,
        tekst: 'Radovi na putu kod Mosta na Adi narednih 5 dana.',
        datumVreme: new Date(Date.now() - 1 * 3600000).toISOString(),
        vrsta: 'obavestenje',
        prioritet: 'srednji',
      },
      {
        idObavestenja: 3,
        tekst: 'Manji sudar na Slaviji, saobraćaj usporen.',
        datumVreme: new Date(Date.now() - 2 * 3600000).toISOString(),
        vrsta: 'saobracajno upozorenje',
        prioritet: 'nizak',
        idIncidenta: 7,
      },
      {
        idObavestenja: 4,
        tekst: 'Kvar semafora u Kneza Miloša 23.',
        datumVreme: new Date(Date.now() - 3 * 3600000).toISOString(),
        vrsta: 'hitno',
        prioritet: 'visok',
        idIncidenta: 4,
      },
      {
        idObavestenja: 5,
        tekst: 'Završena sanacija signalizacije na Pančevačkom mostu.',
        datumVreme: new Date(Date.now() - 1 * 86400000).toISOString(),
        vrsta: 'obavestenje',
        prioritet: 'srednji',
      },
      {
        idObavestenja: 6,
        tekst: 'Pojačana kontrola brzine ovog vikenda.',
        datumVreme: new Date(Date.now() - 2 * 86400000).toISOString(),
        vrsta: 'informacija',
        prioritet: 'nizak',
      },
      {
        idObavestenja: 7,
        tekst: 'Incident završen – saobraćaj normalizovan.',
        datumVreme: new Date(Date.now() - 3 * 86400000).toISOString(),
        vrsta: 'saobracajno upozorenje',
        prioritet: 'nizak',
        idIncidenta: 5,
      },
      {
        idObavestenja: 8,
        tekst: 'Privremena izmena režima saobraćaja u centru grada.',
        datumVreme: new Date(Date.now() - 4 * 86400000).toISOString(),
        vrsta: 'obavestenje',
        prioritet: 'srednji',
      },
      {
        idObavestenja: 9,
        tekst: 'Teška nezgoda sa povređenima – hitne službe na terenu.',
        datumVreme: new Date(Date.now() - 5 * 86400000).toISOString(),
        vrsta: 'hitno',
        prioritet: 'visok',
        idIncidenta: 6,
      },
      {
        idObavestenja: 10,
        tekst: 'Podsetnik: redovna kontrola signalizacije ove nedelje.',
        datumVreme: new Date(Date.now() - 6 * 86400000).toISOString(),
        vrsta: 'informacija',
        prioritet: 'nizak',
      },
    ];

    return of(mockObavestenja).pipe(delay(250));
  }

  // Mock Single Item by ID
  getMockItemById<T>(items: T[], id: number): Observable<T | null> {
    const item = items.find((i: any) => i.id === id || Object.values(i)[0] === id);
    return of(item || null).pipe(delay(200));
  }

  getMockIncidentiPoTezini(): Observable<IncidentStatistikaPoTezini[]> {
    const data = [
      { tezina: 'manji', broj: 78 },
      { tezina: 'veci', broj: 45 },
      { tezina: 'sa povredjenima', broj: 28 },
      { tezina: 'sa poginulima', broj: 5 },
    ];
    return of(data).pipe(delay(300));
  }
  getMockTopLokacije(): Observable<TopLokacija[]> {
    const data = [
      { lokacija: 'Bulevar Oslobođenja', brojIncidenata: 22 },
      { lokacija: 'Autoput E-75', brojIncidenata: 18 },
      { lokacija: 'Slavija', brojIncidenata: 15 },
      { lokacija: 'Kneza Miloša', brojIncidenata: 12 },
      { lokacija: 'Most na Adi', brojIncidenata: 9 },
    ];
    return of(data).pipe(delay(300));
  }
  getMockTopVozaciSaKaznama(): Observable<TopVozacSaKaznama[]> {
    const data = [
      { idVozaca: 7, imeVozaca: 'Milan', prezimeVozaca: 'Milić', brojKazni: 4, ukupanIznos: 24000 },
      {
        idVozaca: 1,
        imeVozaca: 'Marko',
        prezimeVozaca: 'Marković',
        brojKazni: 3,
        ukupanIznos: 18000,
      },
      { idVozaca: 9, imeVozaca: 'Luka', prezimeVozaca: 'Lukić', brojKazni: 2, ukupanIznos: 12000 },
      {
        idVozaca: 4,
        imeVozaca: 'Jelena',
        prezimeVozaca: 'Jovanović',
        brojKazni: 2,
        ukupanIznos: 12000,
      },
      {
        idVozaca: 10,
        imeVozaca: 'Teodora',
        prezimeVozaca: 'Tomić',
        brojKazni: 1,
        ukupanIznos: 6000,
      },
    ];
    return of(data).pipe(delay(300));
  }

  getMockPeriodIzvestaj(godina: number, mesec?: number): Observable<PeriodIzvestaj> {
    const data: PeriodIzvestaj = {
      period: `${mesec ? mesec + '/' : ''}${godina}`,
      ukupnoIncidenata: 42,
      ukupnoKazni: 67,
      ukupnoPovređenih: 11,
      ukupnoPoginulih: 2,
      incidentiPoTezini: {
        manji: 20,
        veci: 15,
        'sa povredjenima': 5,
        'sa poginulima': 2,
      },
      ukupanIznosKazni: 335000,
    };
    return of(data).pipe(delay(400));
  }
  getMockKaznePoVrsti(): Observable<StatistikaPoVrsti[]> {
    const data = [
      { vrsta: 'Brzina', broj: 35 },
      { vrsta: 'Parkiranje', broj: 18 },
      { vrsta: 'Signalizacija', broj: 9 },
      { vrsta: 'Bezbednost', broj: 12 },
    ];
    return of(data).pipe(delay(300));
  }
  getMockKaznePoStatusu(): Observable<StatistikaPoVrsti[]> {
    const data = [
      { vrsta: 'placena', broj: 120 },
      { vrsta: 'nije placena', broj: 98 },
      { vrsta: 'u postupku', broj: 25 },
    ];
    return of(data).pipe(delay(300));
  }
  getMockSignalizacijaStatistika(): Observable<SignalizacijaStatistika> {
    const data: SignalizacijaStatistika = {
      ukupno: 10,
      ispravne: 6,
      uKvaru: 2,
      uOdrzavanju: 2,
    };
    return of(data).pipe(delay(300));
  }
}

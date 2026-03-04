import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnalyticsService } from '../../core/services/analytics.service';
import { TopLokacija, TopVozacSaKaznama, PeriodIzvestaj } from '../../models/analytics.model';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-analitika',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './analitika.component.html',
  styleUrl: './analitika.component.css',
})
export class AnalitikaComponent implements OnInit {
  loading = signal(true);

  // Top 10 data
  topLokacije = signal<TopLokacija[]>([]);
  topVozaci = signal<TopVozacSaKaznama[]>([]);

  // Period data
  mesecniIzvestaj = signal<PeriodIzvestaj | null>(null);
  godisnjiIzvestaj = signal<PeriodIzvestaj | null>(null);

  // Selections
  selectedGodina = new Date().getFullYear();
  selectedMesec = new Date().getMonth() + 1;

  godine = [2024, 2025, 2026];
  meseci = [
    { value: 1, name: 'Januar' },
    { value: 2, name: 'Februar' },
    { value: 3, name: 'Mart' },
    { value: 4, name: 'April' },
    { value: 5, name: 'Maj' },
    { value: 6, name: 'Jun' },
    { value: 7, name: 'Jul' },
    { value: 8, name: 'Avgust' },
    { value: 9, name: 'Septembar' },
    { value: 10, name: 'Oktobar' },
    { value: 11, name: 'Novembar' },
    { value: 12, name: 'Decembar' },
  ];

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading.set(true);

    // Load Top 10 lokacija
    this.analyticsService.getTopLokacije().subscribe({
      next: (data) => this.topLokacije.set(data),
      error: (error) => console.error('Error loading top lokacije:', error),
    });

    // Load Top 10 vozača
    this.analyticsService.getTopVozaciSaKaznama().subscribe({
      next: (data) => this.topVozaci.set(data),
      error: (error) => console.error('Error loading top vozaci:', error),
    });

    // Load mesečni izveštaj
    this.loadMesecniIzvestaj();

    // Load godišnji izveštaj
    this.loadGodisnjiIzvestaj();

    this.loading.set(false);
  }

  loadMesecniIzvestaj(): void {
    this.analyticsService.getMesecniIzvestaj(this.selectedGodina, this.selectedMesec).subscribe({
      next: (data) => this.mesecniIzvestaj.set(data),
      error: (error) => console.error('Error loading mesecni izvestaj:', error),
    });
  }

  loadGodisnjiIzvestaj(): void {
    this.analyticsService.getGodisnjiIzvestaj(this.selectedGodina).subscribe({
      next: (data) => this.godisnjiIzvestaj.set(data),
      error: (error) => console.error('Error loading godisnji izvestaj:', error),
    });
  }

  onGodinaChange(): void {
    this.loadMesecniIzvestaj();
    this.loadGodisnjiIzvestaj();
  }

  onMesecChange(): void {
    this.loadMesecniIzvestaj();
  }

  exportReport(type: string): void {
    const izvestaj = type === 'mesecni' ? this.mesecniIzvestaj() : this.godisnjiIzvestaj();
    if (!izvestaj) {
      alert('Nema podataka za izvoz!');
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const danas = new Date().toLocaleDateString('sr-RS');

    // Helper za centrirani tekst
    const centerText = (text: string, y: number, size: number = 12) => {
      doc.setFontSize(size);
      doc.text(text, pageWidth / 2, y, { align: 'center' });
    };

    // ── ZAGLAVLJE ──
    doc.setFillColor(30, 58, 138); // tamno plava
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    centerText('POLICIJSKA STANICA ZA BEZBEDNOST SAOBRACAJA', 14, 13);
    centerText('Novi Pazar', 21, 10);
    centerText(
      type === 'mesecni'
        ? `MESECNI IZVESTAJ — ${this.getMesecNaziv(this.selectedMesec)} ${this.selectedGodina}`
        : `GODISNJI IZVESTAJ — ${this.selectedGodina}. GODINA`,
      32,
      14,
    );

    // ── INFO LINIJA ──
    doc.setFillColor(241, 245, 249);
    doc.rect(0, 40, pageWidth, 14, 'F');
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Datum generisanja: ${danas}`, 14, 49);
    doc.text(
      `Tip: ${type === 'mesecni' ? 'Mesecni izvestaj' : 'Godisnji izvestaj'}`,
      pageWidth / 2,
      49,
      { align: 'center' },
    );
    doc.text(`Klasifikacija: SLUZBENO`, pageWidth - 14, 49, { align: 'right' });

    let y = 65;

    // ── SUMARNI PODACI ──
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('1. SUMARNI PREGLED', 14, y);
    y += 2;

    // Linija ispod naslova
    doc.setDrawColor(30, 58, 138);
    doc.setLineWidth(0.5);
    doc.line(14, y + 2, pageWidth - 14, y + 2);
    y += 10;

    // 3 kutije sa statistikama
    const boxW = (pageWidth - 42) / 3;
    const boxes = [
      {
        label: 'Ukupno Incidenata',
        value: String(izvestaj.ukupnoIncidenata ?? 0),
        color: [239, 68, 68],
      },
      { label: 'Ukupno Kazni', value: String(izvestaj.ukupnoKazni ?? 0), color: [59, 130, 246] },
      {
        label: 'Ukupan Iznos Kazni',
        value: `${(izvestaj.ukupanIznosKazni ?? 0).toLocaleString()} RSD`,
        color: [16, 185, 129],
      },
    ];

    boxes.forEach((box, i) => {
      const x = 14 + i * (boxW + 7);
      doc.setFillColor(box.color[0], box.color[1], box.color[2]);
      doc.rect(x, y, boxW, 22, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(box.value, x + boxW / 2, y + 13, { align: 'center' });
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(box.label, x + boxW / 2, y + 20, { align: 'center' });
    });

    y += 35;

    // ── INCIDENTI PO TEZINI ──
    if (izvestaj.incidentiPoTezini && Object.keys(izvestaj.incidentiPoTezini).length > 0) {
      doc.setTextColor(30, 41, 59);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('2. INCIDENTI PO TEZINI', 14, y);
      y += 4;
      doc.setDrawColor(30, 58, 138);
      doc.line(14, y, pageWidth - 14, y);
      y += 8;

      // Zaglavlje tabele
      doc.setFillColor(30, 58, 138);
      doc.rect(14, y, pageWidth - 28, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Tezina Incidenta', 20, y + 7);
      doc.text('Broj Incidenata', pageWidth - 50, y + 7);
      y += 10;

      // Redovi tabele
      const entries = Object.entries(izvestaj.incidentiPoTezini);
      entries.forEach(([key, value], idx) => {
        doc.setFillColor(
          idx % 2 === 0 ? 248 : 255,
          idx % 2 === 0 ? 250 : 255,
          idx % 2 === 0 ? 252 : 255,
        );
        doc.rect(14, y, pageWidth - 28, 9, 'F');
        doc.setDrawColor(226, 232, 240);
        doc.rect(14, y, pageWidth - 28, 9, 'S');
        doc.setTextColor(30, 41, 59);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(key.charAt(0).toUpperCase() + key.slice(1), 20, y + 6);
        doc.setFont('helvetica', 'bold');
        doc.text(String(value), pageWidth - 44, y + 6);
        y += 9;
      });
      y += 10;
    }

    // ── GODISNJI: po mesecima ──
    if (
      type === 'godisnji' &&
      izvestaj.incidentiPoStatusu &&
      Object.keys(izvestaj.incidentiPoStatusu).length > 0
    ) {
      doc.setTextColor(30, 41, 59);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('3. INCIDENTI PO MESECIMA', 14, y);
      y += 4;
      doc.setDrawColor(30, 58, 138);
      doc.line(14, y, pageWidth - 14, y);
      y += 8;

      const mesNames: { [k: string]: string } = {
        '1': 'Januar',
        '2': 'Februar',
        '3': 'Mart',
        '4': 'April',
        '5': 'Maj',
        '6': 'Jun',
        '7': 'Jul',
        '8': 'Avgust',
        '9': 'Septembar',
        '10': 'Oktobar',
        '11': 'Novembar',
        '12': 'Decembar',
      };

      doc.setFillColor(30, 58, 138);
      doc.rect(14, y, pageWidth - 28, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('Mesec', 20, y + 7);
      doc.text('Broj Incidenata', pageWidth - 50, y + 7);
      y += 10;

      Object.entries(izvestaj.incidentiPoStatusu).forEach(([key, value], idx) => {
        doc.setFillColor(
          idx % 2 === 0 ? 248 : 255,
          idx % 2 === 0 ? 250 : 255,
          idx % 2 === 0 ? 252 : 255,
        );
        doc.rect(14, y, pageWidth - 28, 9, 'F');
        doc.setDrawColor(226, 232, 240);
        doc.rect(14, y, pageWidth - 28, 9, 'S');
        doc.setTextColor(30, 41, 59);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(mesNames[key] ?? key, 20, y + 6);
        doc.setFont('helvetica', 'bold');
        doc.text(String(value), pageWidth - 44, y + 6);
        y += 9;
      });
      y += 10;
    }

    // ── POTPIS ──
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    doc.setDrawColor(203, 213, 225);
    doc.line(14, y, pageWidth - 14, y);
    y += 10;
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.text(
      'Ovaj izvestaj je automatski generisan od strane Informacionog sistema policijske stanice.',
      14,
      y,
    );
    y += 6;
    doc.text(
      `Generisano: ${danas} | Sistem: IS Policijske stanice za bezbednost saobracaja`,
      14,
      y,
    );

    // ── BROJ STRANE ──
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text('Strana 1 / 1', pageWidth / 2, doc.internal.pageSize.getHeight() - 10, {
      align: 'center',
    });

    // ── DOWNLOAD ──
    const fileName =
      type === 'mesecni'
        ? `izvestaj_${this.getMesecNaziv(this.selectedMesec)}_${this.selectedGodina}.pdf`
        : `izvestaj_godisnji_${this.selectedGodina}.pdf`;

    doc.save(fileName);
  }

  getMesecNaziv(mesec: number): string {
    const nazivi = [
      'januar',
      'februar',
      'mart',
      'april',
      'maj',
      'jun',
      'jul',
      'avgust',
      'septembar',
      'oktobar',
      'novembar',
      'decembar',
    ];
    return nazivi[mesec - 1] ?? String(mesec);
  }
}
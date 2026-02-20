import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AttractionService } from '../Service/attraction.service';
import { AttractionInterface } from '../Interface/attraction.interface';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CritiqueDialogComponent } from '../critique-dialog/critique-dialog.component';
import { CritiqueService } from '../Service/critique.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

type SortMode = 'name' | 'difficulty_desc' | 'difficulty_asc';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {
  attractions: AttractionInterface[] = [];

  critiqueStats: Record<number, { avg: number; count: number }> = {};

  // UI state
  search = '';
  minDifficulty: number | '' = '';
  sort: SortMode = 'difficulty_desc';

  // Par défaut : on cache les attractions invisibles
  showInvisible = false;  

  constructor(
    private attractionService: AttractionService,
    private dialog: MatDialog,
    private critiqueService: CritiqueService,
    private translate: TranslateService
  ) {}


  ngOnInit(): void {
    this.attractionService.getAllAttraction().subscribe({
      next: (data) => {
        this.attractions = data ?? [];

        //Charger les statistiques des critiques
        for (const a of this.attractions) {
          this.loadCritiqueStatsForAttraction(a);
        }
      },
      error: () => (this.attractions = [])
    });
  }



  openCritiqueDialog(a: AttractionInterface): void {
    const ref = this.dialog.open(CritiqueDialogComponent, {
      width: '520px',
      data: {
        attractionId: (a as any).attraction_id,
        attractionNom: a.nom
      }
    });

    ref.afterClosed().subscribe((res) => {
      if (res?.refreshStats) {
        this.loadCritiqueStatsForAttraction(a);
      }
    });
  }

  private getAttractionId(a: any): number {
    return Number(a?.attraction_id ?? a?.id ?? a?.attractionId ?? 0);
  }

  getCritiqueStat(a: any): { avg: number; count: number } | null {
    const id = this.getAttractionId(a);
    return this.critiqueStats[id] ?? null;
  }

  private loadCritiqueStatsForAttraction(a: any): void {
    const id = this.getAttractionId(a);
    if (!id) return;

    this.critiqueService.getCritiques(id).subscribe({
      next: (rows) => {
        const critiques = rows ?? [];
        const count = critiques.length;
        if (!count) {
          this.critiqueStats[id] = { avg: 0, count: 0 };
          return;
        }
        const sum = critiques.reduce((acc: number, c: any) => acc + (Number(c.note) || 0), 0);
        const avg = Math.round((sum / count) * 10) / 10;
        this.critiqueStats[id] = { avg, count };
      },
      error: () => {
        // en cas d'erreur on n'affiche rien
        this.critiqueStats[id] = { avg: 0, count: 0 };
      },
    });
  }

  starFillPercent(avg: number, starIndex: number): number {
    const value = Math.max(0, Math.min(5, avg));
    const start = starIndex - 1;
    const fill = value - start;
    return Math.max(0, Math.min(1, fill)) * 100;
  }

  formatAvg(avg: number): string {
    return (Math.round(avg * 10) / 10).toFixed(1);
  }

  resetFilters(): void {
    this.search = '';
    this.minDifficulty = '';
    this.sort = 'difficulty_desc';
    this.showInvisible = false;
  }

  private isAttractionVisible(a: AttractionInterface): boolean {
    return Boolean((a as any).visible ?? true);
  }

  get filtered(): AttractionInterface[] {
    const q = this.search.trim().toLowerCase();
    const min = this.minDifficulty === '' ? null : Number(this.minDifficulty);

    let items = (this.attractions ?? []).filter(a => {
      // filtre visibilité
      if (!this.showInvisible && !this.isAttractionVisible(a)) return false;

      const matchesText =
        !q ||
        (a.nom ?? '').toLowerCase().includes(q) ||
        (a.description ?? '').toLowerCase().includes(q);

      const d = a.difficulte ?? 0;
      const matchesMin = min == null || d >= min;

      return matchesText && matchesMin;
    });

    items = items.slice().sort((a, b) => {
      const da = a.difficulte ?? 0;
      const db = b.difficulte ?? 0;

      if (this.sort === 'difficulty_desc') return db - da;
      if (this.sort === 'difficulty_asc') return da - db;

      return (a.nom ?? '').localeCompare(b.nom ?? '', 'fr', { sensitivity: 'base' });
    });

    return items;
  }

  difficultyLabel(d?: number | null): string {
    const v = d ?? 0;
    if (v <= 1) return this.translate.instant('HOME.DIFFICULTY_VERY_EASY');
    if (v === 2) return this.translate.instant('HOME.DIFFICULTY_EASY');
    if (v === 3) return this.translate.instant('HOME.DIFFICULTY_MEDIUM');
    if (v === 4) return this.translate.instant('HOME.DIFFICULTY_HARD');
    return this.translate.instant('HOME.DIFFICULTY_VERY_HARD');
  }
}

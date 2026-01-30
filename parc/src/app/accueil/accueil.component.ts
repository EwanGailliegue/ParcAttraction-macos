import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AttractionService } from '../Service/attraction.service';
import { AttractionInterface } from '../Interface/attraction.interface';

type SortMode = 'name' | 'difficulty_desc' | 'difficulty_asc';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {
  attractions: AttractionInterface[] = [];

  // UI state
  search = '';
  minDifficulty: number | '' = '';
  sort: SortMode = 'difficulty_desc';

  // Par défaut : on cache les attractions invisibles
  showInvisible = false;

  constructor(private attractionService: AttractionService) {}

  ngOnInit(): void {
    this.attractionService.getAllAttraction().subscribe({
      next: (data) => (this.attractions = data ?? []),
      error: () => (this.attractions = [])
    });
  }

  resetFilters(): void {
    this.search = '';
    this.minDifficulty = '';
    this.sort = 'difficulty_desc';
    this.showInvisible = false;
  }

  private isAttractionVisible(a: AttractionInterface): boolean {
    // Si ton interface est boolean → OK
    // Si jamais l'API renvoie 0/1, `Boolean(0)` => false, `Boolean(1)` => true
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
    if (v <= 1) return 'Très facile';
    if (v === 2) return 'Facile';
    if (v === 3) return 'Moyen';
    if (v === 4) return 'Difficile';
    return 'Très difficile';
  }
}

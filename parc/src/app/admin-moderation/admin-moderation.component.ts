import { Component, OnInit } from '@angular/core';

import { AttractionService } from '../Service/attraction.service';
import { CritiqueService } from '../Service/critique.service';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

interface AdminCritique {
  critique_id: number;
  attraction_id: number;
  prenom: string | null;
  nom: string | null;
  note: number;
  commentaire: string;
  visible: number | boolean;
  created_at: string;
}

@Component({
  selector: 'app-admin-moderation',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './admin-moderation.component.html',
  styleUrl: './admin-moderation.component.scss'
})
export class AdminModerationComponent implements OnInit {
  public critiques: AdminCritique[] = [];
  public isLoadingCritiques = false;
  public togglingIds = new Set<number>();
  public attractionNames: Record<number, string> = {};

  constructor(
    private attractionService: AttractionService,
    private critiqueService: CritiqueService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load attraction names for display
    this.attractionService.getAllAttraction().subscribe({
      next: (attractions) => {
        for (const a of attractions ?? []) {
          if ((a as any).attraction_id) {
            this.attractionNames[(a as any).attraction_id] = a.nom;
          }
        }
      }
    });
    this.loadCritiques();
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }

  loadCritiques(): void {
    this.isLoadingCritiques = true;
    this.critiqueService.getAllCritiques().subscribe({
      next: (rows) => {
        this.critiques = (rows ?? []) as AdminCritique[];
        this.isLoadingCritiques = false;
      },
      error: () => {
        this.critiques = [];
        this.isLoadingCritiques = false;
      }
    });
  }

  toggleCritiqueVisibility(c: AdminCritique): void {
    const id = c.critique_id;
    if (this.togglingIds.has(id)) return;

    this.togglingIds.add(id);
    const newVisible = !c.visible;

    this.critiqueService.setCritiqueVisibility(id, newVisible).subscribe({
      next: () => {
        c.visible = newVisible ? 1 : 0;
        this.togglingIds.delete(id);
      },
      error: () => {
        this.togglingIds.delete(id);
        this._snackBar.open('Erreur lors de la mise à jour', undefined, { duration: 1500 });
      }
    });
  }

  getAttractionName(attractionId: number): string {
    return this.attractionNames[attractionId] ?? `#${attractionId}`;
  }

  displayAuthor(c: AdminCritique): string {
    const prenom = (c.prenom ?? '').trim();
    const nom = (c.nom ?? '').trim();
    const full = `${prenom} ${nom}`.trim();
    return full || 'Anonyme';
  }

  stars(note: number): string {
    const n = Math.max(1, Math.min(5, Number(note) || 0));
    return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
  }
}

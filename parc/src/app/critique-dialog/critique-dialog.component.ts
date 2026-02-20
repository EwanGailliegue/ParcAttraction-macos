import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CritiqueService } from '../Service/critique.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

type Critique = {
  critique_id: number;
  attraction_id: number;
  prenom: string | null;
  nom: string | null;
  note: number;
  commentaire: string;
  visible: number | boolean;
  created_at: string;
};

@Component({
  selector: 'app-critique-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    TranslateModule,
  ],
  templateUrl: './critique-dialog.component.html',
  styleUrl: './critique-dialog.component.scss',
})
export class CritiqueDialogComponent implements OnInit {
  isSaving = false;
  isLoadingCritiques = false;
  critiques: Critique[] = [];

  private hasChanged = false;

  form = this.fb.group({
    anonyme: [false],
    prenom: [''],
    nom: [''],
    note: [null as number | null, [Validators.required]],
    commentaire: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private critiqueService: CritiqueService,
    private dialogRef: MatDialogRef<CritiqueDialogComponent>,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: { attractionId: number; attractionNom: string }
  ) {
    this.form.get('anonyme')?.valueChanges.subscribe((isAnon) => {
      const prenom = this.form.get('prenom');
      const nom = this.form.get('nom');
      if (isAnon) {
        prenom?.setValue('');
        nom?.setValue('');
        prenom?.disable({ emitEvent: false });
        nom?.disable({ emitEvent: false });
      } else {
        prenom?.enable({ emitEvent: false });
        nom?.enable({ emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.loadCritiques();
  }

  loadCritiques(): void {
    this.isLoadingCritiques = true;
    this.critiqueService.getCritiques(this.data.attractionId).subscribe({
      next: (rows) => {
        this.critiques = (rows ?? []) as Critique[];
        this.isLoadingCritiques = false;
      },
      error: () => {
        this.critiques = [];
        this.isLoadingCritiques = false;
      },
    });
  }

  get count(): number {
    return this.critiques?.length ?? 0;
  }

  get average(): number | null {
    if (!this.critiques?.length) return null;
    const sum = this.critiques.reduce((acc, c) => acc + (Number(c.note) || 0), 0);
    return Math.round((sum / this.critiques.length) * 10) / 10;
  }

  displayName(c: Critique): string {
    const prenom = (c.prenom ?? '').trim();
    const nom = (c.nom ?? '').trim();
    const full = `${prenom} ${nom}`.trim();
    return full || 'Anonyme';
  }

  stars(note: number): string {
    const n = Math.max(1, Math.min(5, Number(note) || 0));
    return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    const v = this.form.getRawValue();
    const payload = {
      prenom: v.anonyme ? null : (v.prenom?.trim() || null),
      nom: v.anonyme ? null : (v.nom?.trim() || null),
      note: v.note!,
      commentaire: v.commentaire!.trim(),
    };

    this.critiqueService.addCritique(this.data.attractionId, payload).subscribe({
      next: () => {
        this.isSaving = false;
        this.hasChanged = true;

        // Reset commentaire, garde la note si tu veux
        this.form.patchValue({ commentaire: '' });
        this.form.get('commentaire')?.markAsPristine();
        this.form.get('commentaire')?.markAsUntouched();

        // Recharge la liste pour afficher la nouvelle critique
        this.loadCritiques();
      },
      error: () => {
        this.isSaving = false;
        alert(this.translate.instant('CRITIQUE.ERROR_SENDING'));
      },
    });
  }

  close(): void {
    this.dialogRef.close({ refreshStats: this.hasChanged });
  }
}

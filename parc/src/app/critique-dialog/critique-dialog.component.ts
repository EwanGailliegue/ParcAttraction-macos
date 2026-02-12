import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CritiqueService } from '../Service/critique.service';

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
  ],
  templateUrl: './critique-dialog.component.html',
  styleUrl: './critique-dialog.component.scss',
})
export class CritiqueDialogComponent {
  isSaving = false;

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

  submit() {
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
        this.dialogRef.close(true);
      },
      error: () => {
        this.isSaving = false;
        // simple pour l’instant (on pourra faire un MatSnackBar ensuite)
        alert("Erreur lors de l'envoi de la critique.");
      },
    });
  }

  close() {
    this.dialogRef.close(false);
  }
}

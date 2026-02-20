import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

import { AttractionInterface } from '../Interface/attraction.interface';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-attractions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './admin-attractions.component.html',
  styleUrl: './admin-attractions.component.scss'
})
export class AdminAttractionsComponent implements OnInit {
  public formulaireAttractions: FormGroup[] = [];
  public isSavingAll = false;

  public attractions: Observable<AttractionInterface[]> = this.attractionService
    .getAllAttraction()
    .pipe(
      tap((attractions: AttractionInterface[]) => {
        this.formulaireAttractions = (attractions ?? []).map(a => this.buildForm(a));
      })
    );

  constructor(
    public attractionService: AttractionService,
    public formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['/admin']);
  }

  private buildForm(a?: Partial<AttractionInterface>): FormGroup {
    return new FormGroup({
      attraction_id: new FormControl(a?.attraction_id ?? null),
      nom: new FormControl(a?.nom ?? '', [Validators.required]),
      description: new FormControl(a?.description ?? '', [Validators.required]),
      difficulte: new FormControl(a?.difficulte ?? 1, [Validators.min(1), Validators.max(5)]),
      visible: new FormControl(a?.visible ?? true)
    });
  }

  public addAttraction(): void {
    const f = this.buildForm({
      attraction_id: null,
      nom: '',
      description: '',
      difficulte: 1,
      visible: true
    });
    f.markAsDirty();
    this.formulaireAttractions = [f, ...this.formulaireAttractions];
  }

  public hasPendingChanges(): boolean {
    return this.formulaireAttractions.some(f => this.isFormSavable(f));
  }

  private isFormSavable(f: FormGroup): boolean {
    const id = f.get('attraction_id')?.value;
    const isNew = !id;
    return (isNew || f.dirty) && f.valid;
  }

  public resetLocalChanges(): void {
    this.attractionService.getAllAttraction().subscribe({
      next: (attractions) => {
        this.formulaireAttractions = (attractions ?? []).map(a => this.buildForm(a));
        this._snackBar.open('Modifications annulées', undefined, { duration: 1200 });
      },
      error: () => {
        this._snackBar.open('Impossible de recharger les attractions', undefined, { duration: 1500 });
      }
    });
  }

  public saveAll(): void {
    if (this.isSavingAll) return;

    const targets = this.formulaireAttractions.filter(f => this.isFormSavable(f));

    if (targets.length === 0) {
      this._snackBar.open('Aucune modification à enregistrer', undefined, { duration: 1200 });
      return;
    }

    const invalids = this.formulaireAttractions.filter(f => (f.dirty || !f.get('attraction_id')?.value) && f.invalid);
    if (invalids.length > 0) {
      invalids.forEach(f => f.markAllAsTouched());
      this._snackBar.open('Certaines lignes sont invalides (nom/description requis, difficulté 1–5).', undefined, {
        duration: 2200
      });
      return;
    }

    this.isSavingAll = true;

    const requests = targets.map(f =>
      this.attractionService.postAttraction(f.getRawValue()).pipe(
        map((result: any) => ({ form: f, result })),
        catchError((err) => of({ form: f, result: null as any, error: true }))
      )
    );

    forkJoin(requests)
      .pipe(finalize(() => (this.isSavingAll = false)))
      .subscribe((results) => {
        let ok = 0;
        let ko = 0;

        results.forEach(r => {
          if ((r as any).error || !r.result) {
            ko++;
            return;
          }
          ok++;
          if (!r.form.get('attraction_id')?.value && r.result?.result) {
            r.form.patchValue({ attraction_id: r.result.result });
          }
          r.form.markAsPristine();
        });

        if (ko === 0) {
          this._snackBar.open(`${ok} attraction(s) enregistrée(s)`, undefined, { duration: 1400 });
        } else {
          this._snackBar.open(`${ok} enregistrée(s), ${ko} en erreur`, undefined, { duration: 2000 });
        }
      });
  }

  public trackById = (_: number, fg: FormGroup) => fg.get('attraction_id')?.value ?? _;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type CreateCritiquePayload = {
  prenom: string | null;
  nom: string | null;
  note: number;
  commentaire: string;
};

@Injectable({ providedIn: 'root' })
export class CritiqueService {
  // Dans ton README, l’API est sur https://api/ (via nginx)
  private readonly baseUrl = 'https://api';

  constructor(private http: HttpClient) {}

  addCritique(attractionId: number, payload: CreateCritiquePayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/attraction/${attractionId}/critiques`, payload);
  }

  getCritiques(attractionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/attraction/${attractionId}/critiques`);
  }
}

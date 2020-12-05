import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from '../models/player';
import { HttpClient } from '@angular/common/http';
//import {LINEUPS_SQUAD, SUBS_SQUAD} from '../mocks/mock-liga';

const playersLigateamBaseUrl = 'http://localhost:8080/api/players/ligateams';
const LigateamBaseUrl = 'http://localhost:8080/api/ligateams';
const playerBaseUrl = 'http://localhost:8080/api/players';

@Injectable({ providedIn: 'root' })

export class LigateamdetailsService {

  constructor(private http: HttpClient) { }

//  getSubstitutesPlayers(): Observable<Player[]> {
//    return of(SUBS_SQUAD);
//  }

//  getLineupsPlayers(): Observable<Player[]> {
//    return of(LINEUPS_SQUAD);
//  }

  getSubstitutesPlayers(id: number): Observable<any> {
    return this.http.get(`${playersLigateamBaseUrl}/${id}/substitute`);
  }

  getLineupsPlayers(id: number): Observable<any> {
    return this.http.get(`${playersLigateamBaseUrl}/${id}/first`);
  }

  getPlayerPositionNumbers(id: number, position: string): Observable<any> {
    return this.http.get(`${playersLigateamBaseUrl}/${id}/${position}/groupbyposition`);
  }

  putPlayers(id: number, data: any): Observable<any> {
    return this.http.put(`${playerBaseUrl}/${id}`, data);
  }

  putLigateam(id: number, data: any): Observable<any> {
    return this.http.put(`${LigateamBaseUrl}/${id}`, data);
  }



}

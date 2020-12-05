import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Ligateam } from '../models/ligateam';
import { LIGATEAMS } from '../mocks/mock-liga';

const baseUrl = 'http://localhost:8080/api/ligateams';

@Injectable({ providedIn: 'root' })

export class LigateamService {

  constructor(private http: HttpClient) { }

//  ligateamsmysql: Ligateam [];
//  getLigateams(): Observable<Ligateam[]> {
//    return of(LIGATEAMS);
//  }

  getLigateam(id: number): Observable<any> {
//    return of(LIGATEAMS.find(ligateam => ligateam.id === id));
    console.log("baseUrl", baseUrl, " id", id);
    return this.http.get(`${baseUrl}/${id}`);
  }

  getAllLigateams(): Observable<any> {
    return this.http.get(baseUrl);
  }
}

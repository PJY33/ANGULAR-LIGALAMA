import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const playersBaseUrl = 'http://localhost:8080/api/players';


@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {

  constructor(private http: HttpClient) { }

  getPlayer(id: number): Observable<any> {
    return this.http.get(`${playersBaseUrl}/${id}`);
  }

  getFreePlayersOfOneL1team(id: number): Observable<any> {
    return this.http.get(`${playersBaseUrl}/l1teams/${id}/free`);
  }

  getFreePlayers(): Observable<any> {
    return this.http.get(`${playersBaseUrl}/free`);
  }

  deletePlayer(id: number): Observable<any> {
    return this.http.delete(`${playersBaseUrl}/${id}`);
  }

  putPlayer(id: number, data: any): Observable<any> {
    return this.http.put(`${playersBaseUrl}/${id}`, data);
  }

  createPlayer(data: any): Observable<any> {
    return this.http.post(`${playersBaseUrl}`, data);
  }

}

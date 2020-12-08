import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const playersroundsBaseUrl = 'http://localhost:8080/api/playerround';
const playersBaseUrl = 'http://localhost:8080/api/players';
const apiFPlayersBaseUrl = 'https://api-football-v1.p.rapidapi.com/v2';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<any> {
    return this.http.get(`${playersBaseUrl}`);
  }

  getPlayersFromTeam(teamid: number): Observable<any> {
    return this.http.get(`${playersBaseUrl}/l1teams/${teamid}`);
  }

  getPlayer(playeridapif: number): Observable<any> {
    return this.http.get(`${playersBaseUrl}/${playeridapif}/apif`);
  }

  getApiFPlayersFromTeam(teamid: number, season: string): Observable<any> {
   
    //Headers
    const headers = new HttpHeaders()
    .set("x-rapidapi-key", "f726273a58mshf13b4622fd00daap11c354jsne13ceb95d9ce")
    .set("x-rapidapi-host", "api-football-v1.p.rapidapi.com");

    //HTTP POST REQUEST
    return this.http.get(`${apiFPlayersBaseUrl}/players/squad/${teamid}/${season}`, {headers: headers});
        
  }

  createPlayer(data: any): Observable<any> {
    return this.http.post(`${playersBaseUrl}`, data);
  }

  putPlayer(id: number, data: any): Observable<any> {
    return this.http.put(`${playersBaseUrl}/${id}`, data);
  }

  createPlayerRound(data: any): Observable<any> {
    return this.http.post(`${playersroundsBaseUrl}`, data);
  }

  deletePlayer(id: number): Observable<any> {
    return this.http.delete(`${playersBaseUrl}/${id}`);
  }

}

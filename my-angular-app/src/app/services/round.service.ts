import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const apiFPlayersBaseUrl = 'https://api-football-v1.p.rapidapi.com/v2';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  constructor(private http: HttpClient) { }

  getApiFCurrentRound(leagueId: number): Observable<any> {
   
    //Headers
    const headers = new HttpHeaders()
    .set("x-rapidapi-key", "f726273a58mshf13b4622fd00daap11c354jsne13ceb95d9ce")
    .set("x-rapidapi-host", "api-football-v1.p.rapidapi.com");

    //HTTP POST REQUEST
    return this.http.get(`${apiFPlayersBaseUrl}/fixtures/rounds/${leagueId}/current`, {headers: headers});
        
  }

  getFixtures(leagueId: number, round: string): Observable<any> {
   
    //Headers
    const headers = new HttpHeaders()
    .set("x-rapidapi-key", "f726273a58mshf13b4622fd00daap11c354jsne13ceb95d9ce")
    .set("x-rapidapi-host", "api-football-v1.p.rapidapi.com");

    //HTTP POST REQUEST
    return this.http.get(`${apiFPlayersBaseUrl}/fixtures/league/${leagueId}/${round}/`, {headers: headers});
        
  }

  getStatisticsFixtures(fixtureId: number): Observable<any> {
   
    //Headers
    const headers = new HttpHeaders()
    .set("x-rapidapi-key", "f726273a58mshf13b4622fd00daap11c354jsne13ceb95d9ce")
    .set("x-rapidapi-host", "api-football-v1.p.rapidapi.com");

    //HTTP POST REQUEST
    return this.http.get(`${apiFPlayersBaseUrl}/players/fixture/${fixtureId}`, {headers: headers});
        
  }
}

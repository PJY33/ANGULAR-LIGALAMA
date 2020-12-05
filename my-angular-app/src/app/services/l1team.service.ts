import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const teamsBaseUrl = 'http://localhost:8080/api/l1teams';
const apiFPlayersBaseUrl = 'https://api-football-v1.p.rapidapi.com/v2';
const l1teamsBaseUrl = 'http://localhost:8080/api/l1teams';

@Injectable({
  providedIn: 'root'
})
export class L1teamService {

  constructor(private http: HttpClient) { }

  getApiFTeamsByLeague(leagueid: number): Observable<any> {
   
    //Headers
    const headers = new HttpHeaders()
    .set("x-rapidapi-key", "f726273a58mshf13b4622fd00daap11c354jsne13ceb95d9ce")
    .set("x-rapidapi-host", "api-football-v1.p.rapidapi.com");

    //HTTP POST REQUEST
    return this.http.get(`${apiFPlayersBaseUrl}/teams/league/${leagueid}`, {headers: headers});
        
  }

  createTeam(data: any): Observable<any> {
    return this.http.post(`${teamsBaseUrl}`, data);
  }

  getL1teams(): Observable<any> {
    return this.http.get(`${l1teamsBaseUrl}`);
  }

  getL1team(teamidapif: number): Observable<any> {
    return this.http.get(`${l1teamsBaseUrl}/${teamidapif}/apif`);
  }

}

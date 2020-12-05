import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../services/players.service';
import { GlobalVariables } from '../mocks/global-variables';
import { L1teamService } from '../services/l1team.service';
import { PLAYERSAPIF, TEAMSAPIF } from '../mocks/mock-apif-response';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [GlobalVariables]
})
export class AdminComponent implements OnInit {
  teamsApiF: any[] = Array();
  playersApiF: any[] = Array();
  players: any[] = Array();    // tableau comportant une valeur unique (contrainte SEQUELIZE)
  l1teams: any;

  constructor(
    private playersService : PlayersService,
    private globalVariables: GlobalVariables,
    private l1teamService : L1teamService,

  ) { }

  ngOnInit(): void {
  }

  private delay(ms: number)
  {
    /// sans le delay ça coince ...    
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getApiFTeamsByLeague() {
      // source = MOCK 
      this.teamsApiF = TEAMSAPIF.api.teams;
      console.log("TEAMSAPIF : ",this.teamsApiF);

      // source = API Football
      //this.l1teamService.getApiFTeamsByLeague(this.globalVariables.league_idapif)
      //  .subscribe(
      //    data => {
      //    this.teamsApiF = data.api.teams;
      //    console.log("teams issue de Api F : ",this.teamsApiF);
      //  },
      //  error => {
      //    console.log(error);
      //  });

      // QUESTION : comment faire pour virer cette tempo dégueux ?
      // await this.delay(3000);

      // Création des équipes de L1 en Bdd
      for (let teamApiF of this.teamsApiF) {
        const l1teamData = {
          team_idapif: teamApiF.team_id,
          l1team_name: teamApiF.name,
          logo: teamApiF.logo,
        }; 
        this.l1teamService.createTeam(l1teamData)
        .subscribe(
          data => {
            console.log("création équipe")
          },
          error => {
            console.log(error);
          });
      };

      // Récupération des équipes de L1
      this.getL1teams();

  }

  // QUESTION : comment éviter de dupliquer cette appel
  // qui est déjà fait à l'identique dans recruitment.component.ts
  // et dans player.component.ts ?
  getL1teams(): void {

    this.l1teamService.getL1teams()
      .subscribe(
        data => {
          this.l1teams = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  async getApiFPlayersFromTeam() {

    this.getL1teams();
  
    
    //for (let l1team of this.l1teams) {

      // récupération des joueurs d'une équipe de L1
//      this.playersService.getApiFPlayersFromTeam(l1team.team_idapif,this.globalVariables.season_apif)
      this.playersService.getApiFPlayersFromTeam(85,this.globalVariables.season_apif)
        .subscribe(
          data => {
            this.playersApiF = data.api.players;
            console.log("players issue de Api F : ",this.playersApiF);
          },
          error => {
            console.log(error);
          });

      // QUESTION : comment faire pour virer cette tempo dégueux ?
      await this.delay(3000);    

      for (let playerApiF of this.playersApiF) {

        // récup du joueur
        console.log("playerApiF.player_id : ", playerApiF.player_id);
        this.playersService.getPlayer(playerApiF.player_id)
        .subscribe(
          data => {
            this.players = data;
            console.log("Player en BDD (tableau !)", this.players);
          },
          error => {
            console.log(error);
          });

        console.log("this.players.length : ", this.players.length);
        console.log("playerApiF.player_id : ", playerApiF.player_id);
        if (this.players.length == 1) {
          
          console.log("this.players[0].player_idapif : ", this.players[0].player_idapif);
          if (this.players[0].player_idapif == playerApiF.player_id) {

            console.log("UPDATE d'un joueur existant");
            // update car le joueur existe en base
            const PlayerData = {
              player_idapif: playerApiF.player_id,
              player_name: playerApiF.player_name,
              position: playerApiF.position,            
            };
            console.log("this.players[0].id", this.players[0].id);
            console.log("PlayerData", PlayerData);
            this.playersService.putPlayer(this.players[0].id, PlayerData)
              .subscribe(
                data => {
                  this.players = data;
                  console.log("UPDATE :",this.players);
                },
                error => {
                  console.log(error);
                });
          } else { 
            console.log("ERREUR : Impossible de retrouver le joueur")
          }          
        
        } else if (this.players.length == 0) {

          console.log("CREATION d'un nouveau joueur");
          // création d'un joueur en base
          const playerData = {
            player_idapif: playerApiF.player_id,
            player_name: playerApiF.player_name,
            position: playerApiF.position,
          }; 
          this.playersService.createPlayer(playerData)
          .subscribe(
            data => {
              this.players = data;
              console.log(this.players);
            },
            error => {
              console.log(error);
            });
        }
      }
    }
}

import { Component, OnInit } from '@angular/core';
import { L1teamService } from '../services/l1team.service';
import { Location } from '@angular/common';
import { L1team } from '../models/l1team';
import { PlayersService } from '../services/players.service';
import { GlobalVariables } from '../mocks/global-variables';
import { PLAYERSAPIF, TEAMSAPIF } from '../mocks/mock-apif-response';
import { Player } from '../models/player';


@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
  providers: [GlobalVariables]
})
export class ImportComponent implements OnInit {
  teamsApiF: any[] = Array();
  l1teams: any;
  l1team: L1team;
  playersApiF: any[] = Array();
  playerApiF: any
  player: any[] = Array();    // tableau comportant une valeur unique (contrainte SEQUELIZE)
  selectedPlayer: any;
  players: Player[];
  isImported: boolean;
  message: string = "";

  constructor(
    private l1teamService : L1teamService,
    private location: Location,
    private playersService : PlayersService,
    private globalVariables: GlobalVariables,
    ) { }

  ngOnInit(): void {
    this.getL1teams();
  }

  goBack(): void {
    this.location.back();
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

      //source = API Football
      //this.l1teamService.getApiFTeamsByLeague(this.globalVariables.league_idapif)
      //  .subscribe(
      //    data => {
      //    this.teamsApiF = data.api.teams;
      //    console.log("teams issue de Api F : ",this.teamsApiF);
      //  },
      //  error => {
      //    console.log(error);
      //  });

      // Création des équipes de L1 en Bdd
      for (let teamApiF of this.teamsApiF) {
        
        //TODO : lors d'un import il faudrait commencer par vider la table
        // car sinon en fin de saison les clubs relégués ne disparaitront pas
        // (pour l'instant je le laisse volontairement comme cela à cause de l'historique)
        this.l1teamService.getL1team(teamApiF.team_id)
        .subscribe(
          data => {
            if (data.length == 0) {

              // On ne crée l'équipe en BDD que si elle n'existe pas
              const l1teamData = {
                team_idapif: teamApiF.team_id,
                l1team_name: teamApiF.name,
                logo: teamApiF.logo,
              }; 
              this.l1teamService.createTeam(l1teamData)
              .subscribe(
                data => {
                  console.log ("CREATION de l'équipe : ", data);
                  this.getL1teams();
                },
                error => {
                  console.log(error);
                });

            } else {
              console.log ("PAS DE CREATION car équipe existante");
              // l'équipe existe déjà en BDD 
              // donc on ne fait rien
            }

          },
          error => {
            console.log(error);
          });

      };

  }

  onSelectL1Team(l1team: L1team) {

    this.playersService.getApiFPlayersFromTeam(l1team.team_idapif, this.globalVariables.season_apif)
      .subscribe(
        data => {
          this.l1team = l1team;
          this.playersApiF = data.api.players;
          console.log("this.playersApiF (TOUS APIF)",this.playersApiF)
        
          // création ou MAJ des joueurs en base
          for (let playerApiF of this.playersApiF) {  
            
            //console.log("playerApiF UNIQUE: ", playerApiF);
            this.playersService.getPlayer(playerApiF.player_id)
            .subscribe(
              data => {
                this.player = data;
                // console.log("this.player (BDD): ", this.player);
                if (this.player.length == 1) {
                   //console.log("un joueur est trouvé en base avec l'id APIF");
                   //console.log("this.players[0].player_idapif : ", this.players[0].player_idapif);
                   if (this.player[0].player_idapif == playerApiF.player_id) {
                     //udatePlayer
                     //this.updateplayer(this.player[0].id, playerApiF);
                   } else {
                     console.log("ERREUR : Impossible de retrouver le joueur")
                   }          
                  
                } else if (this.player.length == 0) {
                  /// createPlayer
                  //this.createplayer(playerApiF);
                };
        
              },
              error => {
                console.log(error);
              });            

          };
//          this.message = 'Pour ' + l1team.l1team_name + ', ' + createNumber + ' création(s) / ' + updateNumber + ' modification(s) / ' + errorNumber + ' erreur(s)';
          
        },
        error => {
          console.log(error);
        });

   
    // A commenter selon le cas
    /*
      this.l1team = l1team;
      console.log("l1team sélectionné :",this.l1team);
      this.playersApiF = PLAYERSAPIF.api.players;
      console.log("Bouchon de playersApiF :",this.playersApiF);
    */
  }

  getL1teams(): void {

    this.l1teamService.getL1teams()
      .subscribe(
        data => {
          this.l1teams = data;
          console.log("l1team : ",data);
        },
        error => {
          console.log(error);
        });
  }


  updateplayer(playerid: number, playerApiF: any) {

    //console.log("UPDATE d'un joueur existant", playerApiF.player_name, playerApiF, "this.l1team.id : ", this.l1team.id, "playerid", playerid);
    const PlayerData = {
      player_idapif: playerApiF.player_id,
      player_name: playerApiF.player_name,
      position: playerApiF.position,
      l1teamId: this.l1team.id,       
    };
    //console.log("PlayerData", PlayerData);
    this.playersService.putPlayer(playerid, PlayerData)
      .subscribe(
        data => {
          this.player = data;
          console.log("Joueur MODIFIE en base : ",this.player);
        },
        error => {
          console.log(error);
        });

  }

  createplayer(playerApiF: any) {

    //console.log("CREATION d'un nouveau joueur", playerApiF);
    //création d'un joueur en base
    const playerData = {
      player_idapif: playerApiF.player_id,
      player_name: playerApiF.player_name,
      position: playerApiF.position,
      l1teamId: this.l1team.id,
      point: 0,
    }; 
    this.playersService.createPlayer(playerData)
    .subscribe(
      data => {
        this.player = data;
        console.log("Joueur CREE en base : ",this.player);
      },
      error => {
        console.log(error);
      });

      // suppression du joueur dans la liste
      //let index = this.playersApiF.indexOf(playerApiF);
      //console.log("Index : ",index);
      //let removed = this.playersApiF.splice(index, 1);
      //console.log("Tableau modifié : ",this.playersApiF);

  }

  getPlayers(teamId: number): void {
    this.playersService.getPlayersFromTeam(teamId)
      .subscribe(
        data => {
          this.players = data;
          console.log("this.players",data);     
        },
        error => {
          console.log(error);
        });
  }
    

}

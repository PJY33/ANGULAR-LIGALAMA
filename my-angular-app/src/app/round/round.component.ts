import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { RoundService } from '../services/round.service';
import { PlayersService } from '../services/players.service';
import { L1teamService } from '../services/l1team.service';
import { GlobalVariables } from '../mocks/global-variables';
import { ViewModelFixture } from '../models/viewModelFixtures';
import { CalculPoints } from '../models/calculPoints';
import { FIXTURESAPIF, STATISTICSFIXTURESAPIF_NM, STATISTICSFIXTURESAPIF_RL } from '../mocks/mock-apif-response';
import { FixturePlayer } from '../models/fixturePlayers';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';


@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css'],
  providers: [GlobalVariables]
})
export class RoundComponent implements OnInit {
  statisticFixturePlayers: any[] = Array();
  fixtures: any[] = Array();
  viewModelFixtures: ViewModelFixture[] = [];
  isViewModelVisible: boolean = false;
  rounds: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];
  fixtureStartDate: number;
  fixtureEndDate: number;
  myRound: string;
  player: any[] = Array();    // tableau comportant une valeur unique (contrainte SEQUELIZE)
  playersList: FixturePlayer[] = []; 

  // Variables utilisées pour le calcul des points d'un joueur
  teamPoint: number;
  teamGoalDifferencePoint: number;
  teamGoalConceded: number;
  playerPlayed: number; 
  playerScoredAndMultiScored: number;
  playerKeyGoal: number;
  playerKeyPass: number;
  playerPenalty: number;
  playerRedCard: number;
  totalPoint: number = 0;


  constructor(
    private location: Location,
    private roundService : RoundService,
    private l1teamService : L1teamService,
    private playersService : PlayersService,
    private globalVariables: GlobalVariables,
  ) { }

  ngOnInit(): void {
    this.getCurrentRound();
  }

  goBack(): void {
    this.location.back();
  }

  getCurrentRound(): void {
    
    // à remplacer par
    //console.log("this.globalVariables.league_idapif",this.globalVariables.league_idapif);
    //this.getFixtures(this.globalVariables.league_idapif, "inutile");
    
    this.roundService.getApiFCurrentRound(this.globalVariables.league_idapif)
    .subscribe(
        data => {
        this.myRound = data.api.fixtures[0];
        console.log(JSON.stringify(data));
        console.log("currentRound : ",this.myRound);
        this.getFixtures(this.globalVariables.league_idapif, this.myRound);
      },
      error => {
        console.log(error);
      });
    
  }

  onRoundSelection(round: number): void {
    this.myRound = 'Regular_Season_-_' + round;
    this.viewModelFixtures = [];
    this.getFixtures(this.globalVariables.league_idapif, this.myRound);
  }

  getFixtures(leagueId:number, round:string): void {
    
// à remplacr par le code commenté qui est un bouchon    
    this.fixtures = FIXTURESAPIF.api.fixtures;
    console.log("FIXTURESAPIF (bouchon) : ",this.fixtures);    
    
    //this.roundService.getFixtures(leagueId, round)
    //.subscribe(
    //    data => {
    //    this.fixtures = data.api.fixtures;
    //    console.log(JSON.stringify(data));
    //    console.log("FIXTURESAPIF (APIF) :  : ",this.fixtures);

        for (let fixture of this.fixtures) {
          //console.log("fixture : ", fixture);
          if (fixture.statusShort == "NS") {
            this.viewModelFixtures.push({
              fixture_id: fixture.fixture_id,
              event_date: fixture.event_date,
              homeTeam_id: fixture.homeTeam.team_id,
              homeTeam_name: fixture.homeTeam.team_name,
              homeTeam_logo: fixture.homeTeam.logo, 
              goalsHomeTeam: fixture.goalsHomeTeam,
              awayTeam_id: fixture.awayTeam.team_id,
              awayTeam_name: fixture.awayTeam.team_name,
              awayTeam_logo: fixture.awayTeam.logo, 
              goalsAwayTeam: fixture.goalsAwayTeam,
              statusShort: fixture.statusShort,
            });
          } else {
            this.viewModelFixtures.push({
              fixture_id: fixture.fixture_id,
              event_date: null,
              homeTeam_id: fixture.homeTeam.team_id,
              homeTeam_name: fixture.homeTeam.team_name,
              homeTeam_logo: fixture.homeTeam.logo, 
              goalsHomeTeam: fixture.goalsHomeTeam,
              awayTeam_id: fixture.awayTeam.team_id,
              awayTeam_name: fixture.awayTeam.team_name,
              awayTeam_logo: fixture.awayTeam.logo, 
              goalsAwayTeam: fixture.goalsAwayTeam,
              statusShort: fixture.statusShort,
            });
          };

        };
        console.log("viewModelFixtures - RES", this.viewModelFixtures);
        
        this.fixtureStartDate=this.fixtures[0].event_date;
        this.fixtureEndDate=this.fixtures[this.fixtures.length - 1].event_date;
        this.isViewModelVisible=true;
    //  },
    //  error => {
    //    console.log(error);
    //  });
         
  }

  private delay(ms: number)
  {
    /// sans le delay ça coince ...    
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async onSelectViewModelFixture(viewModelFixture: ViewModelFixture) {
    
    
    // Etape 1 : récupérer la liste des joueurs des 2 clubs
    let fixturePlayersList: FixturePlayer[] = [];
    fixturePlayersList = await this.getPlayers(fixturePlayersList, viewModelFixture.homeTeam_id, "home", false);
    fixturePlayersList = await this.getPlayers(fixturePlayersList, viewModelFixture.awayTeam_id, "away", false);
    console.log("fixturePlayersList",fixturePlayersList);
    
    // Etape 2 : récupérer les stats de la fixture
    let statisticFixturePlayers: any[] = [];    
    statisticFixturePlayers = await this.getStatisticFixtureTraitement(viewModelFixture.fixture_id);
    console.log("statisticFixturePlayers",statisticFixturePlayers);
  
    // Etape 3 : pour sur les stats de chaque joueur
    this.boucle(statisticFixturePlayers, viewModelFixture, fixturePlayersList);

    // tempo bien pourrie mais je n'ai pas trouvé d'autres solutions pour l'instant
    await this.delay(10000);

    console.log("FIN du traitement : fixturePlayersList = ",this.playersList);
    //TODO : créer les playersrounds
    // -3 pour les milieux et attaquants 
    // -4 pour les gardiens et défenseurs 

  }

  boucle(statisticFixturePlayers: any, viewModelFixture: ViewModelFixture, fixturePlayersList: FixturePlayer[]) {

      for (let statisticFixturePlayer of statisticFixturePlayers) {
        // Etape 4 : récupérer le joueur correspondant en base
        this.playersPointCalcul(statisticFixturePlayer, viewModelFixture, fixturePlayersList);
      }

  }


  getPlayers(fixturePlayersList: FixturePlayer[], teamId: number, type:string, hasPlayed: boolean): FixturePlayer[] {
    
    // constitution de la liste des joueurs des 2 équipes
    this.l1teamService.getL1team(teamId)
    .subscribe(
        data => {         

          // ajout des joueurs de l'équipe dans la liste des joueurs
          let players: any[] = data[0].players;
          
          for (let player of players) {
            fixturePlayersList.push({playeridapif: player.player_idapif, homeOrAway: type, position: player.position, played: hasPlayed});
          };
          
        },
        error => {
          console.log(error);
        });
        return fixturePlayersList;

  }

  playersPointCalcul(statisticFixturePlayer: any, viewModelFixture: ViewModelFixture, fixturePlayersList: FixturePlayer[]) {

    this.playersService.getPlayer(statisticFixturePlayer.player_id)
    .subscribe(
      data => {
        console.log("player : ", data);
        this.player=data;

        if (this.player.length == 1 && this.player[0].player_idapif == statisticFixturePlayer.player_id) {

          // ============================
          // Calcul des points du joueur
          // ============================
          //console.log("player BDD: ",this.player);
          //console.log("viewModelFixture : ",viewModelFixture);
          //console.log("statisticFixturePlayer : ",statisticFixturePlayer);      
          this.calcul(viewModelFixture, statisticFixturePlayer, this.player[0], fixturePlayersList);
          
        } else { 
          console.log("ERREUR : ce cas ne doit pas se produire !")
        }
      },
      error => {
        console.log(error);
      }); 

      

}


  getStatisticFixtureTraitement(fixtureId: number): any[] {


      // à remplacer par le code commenté qui est un bouchon    
      this.statisticFixturePlayers = STATISTICSFIXTURESAPIF_NM.api.players;
      console.log("STATISTICSFIXTURESAPIF_NM (bouchon) : ",this.statisticFixturePlayers); 
      return this.statisticFixturePlayers;

      //this.roundService.getStatisticsFixtures(viewModelFixture.fixture_id)
      //.subscribe(
      //    data => {
      //    this.statisticFixturePlayers = data.api.players;
      //    console.log("STATISTICSFIXTURESAPIF (APIF) : ", data);
      //    console.log(JSON.stringify(data));  
      //    return this.statisticFixturePlayers;      
      //  },
      //  error => {
      //    console.log(error);
      //  });
  }



    


// ==============================
// Calcul des points des joueurs
// ==============================

  async calcul(viewModelFixture: ViewModelFixture, statisticFixturePlayer: any, player: any, fixturePlayersList: FixturePlayer[]) {

    // Appels successifs pour calculer tous les types de points
    this.teamPoint = await this.calculTeamPoint(viewModelFixture, statisticFixturePlayer);
    this.teamGoalDifferencePoint = await this.calculTeamGoalDifferencePoint(viewModelFixture, statisticFixturePlayer);
    this.teamGoalConceded = await this.calculteamGoalConceded(viewModelFixture, statisticFixturePlayer, player);
    this.playerPlayed = await this.calculplayerPlayed();
    this.playerScoredAndMultiScored = await this.calculplayerScoredAndMultiScored(statisticFixturePlayer, player);
    this.playerPenalty = await this.calculplayerPenalty(statisticFixturePlayer, player);
    this.playerRedCard = await this.calculplayerRedCard(statisticFixturePlayer);
    this.playerKeyPass = await this.calculplayerKeyPass(statisticFixturePlayer);

    console.log('teamPoint = ',this.teamPoint);
    console.log('teamGoalDifferencePoint = ',this.teamGoalDifferencePoint);
    console.log('teamGoalConceded = ',this.teamGoalConceded);
    console.log('playerPlayed = ',this.playerPlayed);
    console.log('playerScoredAndMultiScored = ',this.playerScoredAndMultiScored);
    console.log('playerPenalty = ',this.playerPenalty);
    console.log('playerRedCard = ',this.playerRedCard);
    console.log('playerKeyPass = ',this.playerKeyPass);

    this.totalPoint = this.teamPoint + this.teamGoalDifferencePoint + this.teamGoalConceded + this.playerPlayed + this.playerScoredAndMultiScored + this.playerPenalty + this.playerRedCard + this.playerKeyPass;
    console.log('TOTAL de ',statisticFixturePlayer.player_name, ' = ',this.totalPoint);
    console.log('=============================');

    //TODO = MAJ de la BDD playersrounds
    let index: number = 0;
    while (index < fixturePlayersList.length && fixturePlayersList[index].playeridapif != statisticFixturePlayer.player_id) {
      index += 1;
    }
    if (fixturePlayersList[index].playeridapif == statisticFixturePlayer.player_id) {
      fixturePlayersList[index].played = true;
      console.log("Marqué comme ayant joué : ",statisticFixturePlayer.player_name,"  ",statisticFixturePlayer.player_id);      
    }
    
    this.playersList = fixturePlayersList;

  }


  calculTeamPoint(viewModelFixture: ViewModelFixture, statisticFixturePlayer: any) {
    // ======================================================
    // A domicile : Victoire = +2, Nul = -1, Défaite = -4
    // A l’extérieur : Victoire = +4, Nul = +1, Défaite = -2
    // ======================================================

    let point = 0;
    if (statisticFixturePlayer.team_id == viewModelFixture.homeTeam_id) {
      // joueur de l'équipe à domicile
      if (viewModelFixture.goalsHomeTeam>viewModelFixture.goalsAwayTeam) {
        // victoire domicile
        point = 2
      } else if (viewModelFixture.goalsHomeTeam<viewModelFixture.goalsAwayTeam) {
        // victoire extérieur
        point = -4;
      } else {
        // match nul
        point = -1;
      }
    } else {
      // joueur de l'équipe à l'extérieur      
      if (viewModelFixture.goalsHomeTeam>viewModelFixture.goalsAwayTeam) {
        // victoire domicile
        point = -2;
      } else if (viewModelFixture.goalsHomeTeam<viewModelFixture.goalsAwayTeam) {
        // victoire extérieur
        point = 4;
      } else {
        // match nul
        point = 1;
      }
    } 
    return point;

  }

  calculTeamGoalDifferencePoint(viewModelFixture: ViewModelFixture, statisticFixturePlayer: any) {
    // ================================================================
    // La différence de but des matchs joués par les équipes FFF
    // est appliquée à tous les joueurs ayant participé aux rencontres
    // ================================================================

    let point = 0;
    // différence de but
    let diff = viewModelFixture.goalsHomeTeam - viewModelFixture.goalsAwayTeam
    if (statisticFixturePlayer.team_id == viewModelFixture.homeTeam_id) {
      // joueur de l'équipe à domicile
      point = diff;
    } else {
      // joueur de l'équipe ext
      point = diff * (-1);
    } 
    return point;

  }

  calculteamGoalConceded(viewModelFixture: ViewModelFixture, statisticFixturePlayer: any, player: any) {
    // =================================================================================
    // Pour les gardiens et défenseurs : -2 par but encaissé à partir du deuxième but
    // Si aucun but encaissé : gardiens et défenseurs bénéficient de +2
    // =================================================================================

    let point = 0;
    if (player.position == "Defender" || player.position == "Goalkeeper") {
      if (statisticFixturePlayer.team_id == viewModelFixture.homeTeam_id) {
        // joueur de l'équipe domicile
        if (viewModelFixture.goalsHomeTeam > 1) {
          // plus de 2 buts
          point = (viewModelFixture.goalsHomeTeam - 1)*(-2)       
        } else if (viewModelFixture.goalsHomeTeam == 0) {
          // clean sheet
          point = 2
        }
      } else {
        // joueur de l'équipe extérieur
        if (viewModelFixture.goalsAwayTeam > 1) {
          // plus de 2 buts
          point = (viewModelFixture.goalsAwayTeam - 1) * (-2)       
        } else if (viewModelFixture.goalsAwayTeam == 0) {
          // clean sheet
          point = 2
        }
      } 
    }
    return point;
  }

  async calculplayerPlayed() {
    // =================================================================================
    // Joueur participant au match : +1
    // =================================================================================
    let point = 1;  
    return point;
  }

  calculplayerScoredAndMultiScored(statisticFixturePlayer: any, player: any) {
    // =================================================================================
    // Par but
    // - Attaquant : +4
    // - Milieu : +6
    // - Défenseur : +8
    // - Gardien : +10
    //
    // Multi-buts
    // - 2 buts : 2 points, 3 buts : 4 points, 4 buts : 6 points, ... 
    // =================================================================================
    let point = 0;

    // Par but
    if (statisticFixturePlayer.goals.total > 0) {
      if (player.position == "Goalkeeper") {
        point = 10 * statisticFixturePlayer.goals.total;
      } else if (player.position == "Defender") {
        point = 8 * statisticFixturePlayer.goals.total;
      } else if (player.position == "Midfielder") {
        point = 6 * statisticFixturePlayer.goals.total;
      } else {
        point = 4 * statisticFixturePlayer.goals.total;
      }           
    };

    // Multi-buts
    if (statisticFixturePlayer.goals.total > 1) {
      point += (statisticFixturePlayer.goals.total - 1) * 2;
    };
    return point;
  }

  calculplayerKeyGoal(viewModelFixture: ViewModelFixture, statisticFixturePlayer: any, player: any) {
    // =================================================================================
    // But décisif :
    // Tout but inscrit à compter de la 75éme minute et permettant à l’équipe de :
    // -	faire match nul vaut à son auteur +3 
    // -	gagner par un but d’écart  vaut à son auteur +4     
    // =================================================================================
    // TODO = nécessite l'import des EVENTS pour vérifier cette RG
    let point = 0;  
    return point;  
  }

  calculplayerKeyPass(statisticFixturePlayer: any) {
    // =================================================================================
    // Passe décisive : +2
    // =================================================================================
    let point = 0;  
    if (statisticFixturePlayer.passes.key > 0) {
      // passe décisive
      point = 2 * statisticFixturePlayer.passes.key;
    }
    return point;
  }

  calculplayerPenalty(statisticFixturePlayer: any, player: any) {
    // =================================================================================
    // Pénalties :
    // -	Non encaissé : +5 pour le gardien
    // -	Marqué : +2 quel que soit le poste du tireur
    // -	Non marqué : -1 quel que soit le poste du tireur
    // =================================================================================
    let point = 0;
    if (statisticFixturePlayer.penalty.saved > 0 && player.position == "Goalkeeper") {
      // penaltie sauvé
      point = 5 * statisticFixturePlayer.penalty.saved;
    } else if (statisticFixturePlayer.penalty.success > 0) {
      // penaltie marqué
      point = 2 * statisticFixturePlayer.penalty.success;    
    } else if (statisticFixturePlayer.penalty.missed > 0) {
      // penaltie raté
      point = (-1) * statisticFixturePlayer.penalty.missed;
    };
    return point;
  }

  calculplayerRedCard(statisticFixturePlayer: any) {
    // =================================================================================
    // Cartons :
    // -	rouge : -5
    // -  jaune : -1 
    // =================================================================================
    // TODO : checker la comptabilisation de 2 jaunes au niveau de l'APIF
    // =================================================================================

    let point = 0;
    if (statisticFixturePlayer.cards.red == 1 || statisticFixturePlayer.cards.yellow == 2) {
      // carton rouge
      point = -5;
    } else if (statisticFixturePlayer.cards.yellow == 1) {
      // penaltie jaune
      point = -1;    
    }
    return point;
  }

}


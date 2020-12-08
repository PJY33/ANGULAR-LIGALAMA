import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Ligateam } from '../models/ligateam';
import { Player } from '../models/player';
import { LigateamService } from '../services/ligateam.service';
import { LigateamdetailsService } from '../services/ligateamdetails.service';
import { PlayersService } from '../services/players.service';

@Component({
  selector: 'app-ligateam-detail',
  templateUrl: './ligateam-detail.component.html',
  styleUrls: ['./ligateam-detail.component.css']
})

export class LigateamDetailComponent implements OnInit {
  /// variables recevant les données du backend
  lineupsplayers: any;
  substitutesplayers: any;
  playerPositionNumbers: any;
  
  ligateam: Ligateam;
  selectedPlayer: Player;
  coachSelectedPlayer: Player;
  outSelectedPlayer: Player;
  player: Player;
  message: string = "";
  unconformityMessage: string = "";

  // permet de gérer les messages du bandeau en cas de non conformité
  playersAlert: boolean = false;
  redError:boolean = false;
  yellowError:boolean = false;
  blueError:boolean = false;
  darkError:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ligateamService: LigateamService,
    private ligateamdetailsService: LigateamdetailsService, 
    private playersService: PlayersService,  
    ) { }

  ngOnInit(): void {
    this.getLigateam();
    this.getLineupsPlayers();
    this.getSubstitutesPlayers();
    this.getPlayerPositionNumbers();
    this.ligateamConformity();
  }

  goBack(): void {
    this.location.back();
  }

  getLigateam(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ligateamService.getLigateam(id)
      .subscribe(
        data => {
        this.ligateam = data;
        console.log("getLigateam() :",data);
      },
      error => {
        console.log(error);
      });
  }

  getLineupsPlayers(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ligateamdetailsService.getLineupsPlayers(id)
      .subscribe(
        data => {
          this.lineupsplayers = data;
          console.log("getLineupsPlayers() :",data);
          console.log("length lineupsplayers :",this.lineupsplayers.length);       
        },
        error => {
          console.log(error);
        });
  }

  getSubstitutesPlayers(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ligateamdetailsService.getSubstitutesPlayers(id)
      .subscribe(
        data => {
          this.substitutesplayers = data;
          console.log("getsubstitutesPlayers() :",data);
          console.log("length substitutesplayers :",this.substitutesplayers.length);  
        },
        error => {
          console.log(error);
        });
  }

  getPlayerPositionNumbers(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const position = "first";
    this.ligateamdetailsService.getPlayerPositionNumbers(id, position)
      .subscribe(
        data => {
          this.playerPositionNumbers = data;
          console.log("getPositionNumberPlayer() :",data);
        },
        error => {
          console.log(error);
        });
  }

  onSelectPlayer(player: Player): void {
    this.selectedPlayer = player;
    /// permet de mettre à jour le message
    /// sans le click sur le bouton coaching
    if (player.state == "substitute") {
      this.message = " devient titulaire ?";
    } else {
      this.message = " devient remplaçant ?";
    }
  }

  onCoaching(player: Player): void {
    this.coachSelectedPlayer = player;
    if (player.state == "substitute") {
      this.message = " devient titulaire ?";
    } else {
      this.message = " devient remplaçant ?";
    }
  }

  onOut(player: Player): void {
    
    this.outSelectedPlayer = player;
    this.message = " quitte l'effectif ?";

  }

  sendMessage(message: string) {
    var request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/778305478513393664/UyZCJQbLC63uSYo7gZ3eCsSx5TbGYfJhYpuVdn2EPoZ61PyCtjFTYe-BEgLlGZvkQsnc");

    console.log("Message à envoyer  : ", message);
    request.setRequestHeader('Content-type', 'application/json');

    var params = {
      username: "LIGA",
      avatar_url: "",
      content: message,
    }

    request.send(JSON.stringify(params));
  }

  updatePlayer(player: Player): void {

    delete (this.selectedPlayer);
    delete (this.outSelectedPlayer);
    
    // (Re)create the leaving player without ligateamId
    // can't use the update with NULL value !!!

    const PlayerData = {
      player_idapif: player.player_idapif,
      player_name: player.player_name,
      position: player.position,
      l1teamId: player.l1teamId,
    }; 
    this.playersService.createPlayer(PlayerData)
    .subscribe(
      data => {
        console.log("CREATE new :",data);
      },
      error => {
        console.log(error);
      });


    // Delete the leaving player
    this.playersService.deletePlayer(player.id)
      .subscribe(
        data => {
          console.log("DELETE old :",data);
          this.ngOnInit();
        },
        error => {
          console.log(error);
        });

    // Envoi d'une notification lors du départ du joueur    
    this.sendMessage(player.player_name.toUpperCase() + " (" + player.position + ", " + player.l1team.l1team_name + ") quitte " + this.ligateam.ligateam_name.toUpperCase());
  
  }


  // change le statut du joueur passé en param
  // first <=> substitute
  updatePlayerState(player: Player): void {

    delete (this.selectedPlayer);
    delete (this.coachSelectedPlayer);
    console.log("player.state : ", player.state);
  
    if (player.state == "substitute") {
      player.state = "first";
    } else {
      player.state = "substitute";
    }

    this.ligateamdetailsService.putPlayers(player.id, player)
        .subscribe(
          data => {
            console.log("Res Update putPlayers() :",data);
            this.ngOnInit();
          },
          error => {
            console.log(error);
          });

  }

  private async ligateamConformity() {
    
    // sans cette tempo cela ne fonctionne pas
    await this.delay(1000);
    let initialConformityState = this.ligateam.conformity
    
    // cas du nombre de joueur incorrect
    if ((this.lineupsplayers.length + this.substitutesplayers.length) != 12) {
      // console.log("cas rouge - 1 ");
      this.ligateam.conformity = 1;
      this.playersAlert = true;
      this.redError=true;

    // cas de non conformité dans la répartition titulaire / remplaçant 
    } else if (this.lineupsplayers.length != 11 || this.substitutesplayers.length != 1) {
      // console.log("cas jaune - 2 ");
      this.ligateam.conformity = 2;
      this.playersAlert = true;
      this.yellowError=true;
      this.redError=false;
      this.darkError=false;

    // cas de plus de 3 joueurs d'un même club
    } else if (this.moreThanTheePlayers()) {
      // console.log("cas bleu - 1 ");
      this.ligateam.conformity = 3;
      this.playersAlert = true;
      this.blueError=true;
      this.redError=false;
      this.yellowError=false;
      this.darkError=false;
      
      // cas des compos non conformes
      // compo autorisées : 443/442/532/541/451
    } else if (this.positionConformity()) {
      // console.log("cas dark - 4 ");
      this.ligateam.conformity = 4;
      this.playersAlert = true;
      this.darkError=true;
      this.blueError=false;
      this.redError=false;
      this.yellowError=false;

    // cas de l'équipe conforme
    } else {
      // console.log("cas conforme");
      this.ligateam.conformity = 0;
      this.playersAlert = false;
      this.redError=false;
      this.yellowError=false;
      this.blueError=false;
      this.darkError=false;
    } 

    // Mise à jour de l'état de conformité de l'équipe si le state a changé  
    console.log(this.ligateam.conformity);  
    if (initialConformityState != this.ligateam.conformity) {
      this.updateLigateamConformity(this.ligateam);
    }
        
  } 

  moreThanTheePlayers(): boolean {
    var towns:number[] = Array();
    
    let i=0;
    for (let player of this.lineupsplayers) {
      towns[i] = player.l1teamId;      
      i++;
    };
    var someArray = towns;
    for (let i = 0; i < someArray.length; i++) {
      let count=this.getOccurrence(towns, someArray[i]);
      if (count>3) {
        return true;
      }
    }
    return false;
  }

  positionConformity(): boolean {
    
    // variables pour vérification de la conformité de la compo
    let goalkeeper:number;
    let defender:number;
    let mildfielder:number;
    let attacker:number;
    
    // Récuparation du nombre de joueurs par place
    console.log("positionConformity()");
    for (let playerPositionNumber of this.playerPositionNumbers) {
      if (playerPositionNumber.position == "Goalkeeper") {
        goalkeeper = playerPositionNumber.number;
      } else if (playerPositionNumber.position == "Defender") {
        defender = playerPositionNumber.number;
      } else if (playerPositionNumber.position == "Midfielder") {
        mildfielder = playerPositionNumber.number;
      } else {
        attacker = playerPositionNumber.number;
      }
    };

    // Vérification des systèmes de jeu
    if (goalkeeper == 1 && defender == 5 && mildfielder == 4 && attacker == 1) { 
      this.unconformityMessage = "";
      return false;
    } else if (goalkeeper == 1 && defender == 5 && mildfielder == 3 && attacker == 2) {
      this.unconformityMessage = "";
      return false;
    } else if (goalkeeper == 1 && defender == 4 && mildfielder == 3 && attacker == 3) {
      this.unconformityMessage = "";
      return false;
    } else if (goalkeeper == 1 && defender == 4 && mildfielder == 4 && attacker == 2) {
      this.unconformityMessage = "";
      return false;
    } else if (goalkeeper == 1 && defender == 4 && mildfielder == 5 && attacker == 1) {
      this.unconformityMessage = "";
      return false;
    } else {
      this.unconformityMessage = 'Actuellement, tu joues en ' + defender + '/' + mildfielder + '/' + attacker;
      return true;
    };

  }

  displayAlert() {
    if (this.redError||this.yellowError||this.blueError||this.darkError) {
      return true;
    } else {
      return false;
    }
  }

  updateLigateamConformity(ligateam: Ligateam): void {
    this.ligateamdetailsService.putLigateam(ligateam.id, ligateam)
    .subscribe(
      data => {
        console.log("Res Update putLigateam() :",data);
      },
      error => {
        console.log(error);
      });
  }

  private delay(ms: number)
  {
    /// sans le delay ça coince ...    
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
  }

}

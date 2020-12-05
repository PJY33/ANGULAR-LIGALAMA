import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, UpperCasePipe } from '@angular/common';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../models/player';
import { L1team } from '../models/l1team';



import { RecruitmentService } from '../services/recruitment.service';
import { L1teamService } from '../services/l1team.service';
import { LigateamService } from '../services/ligateam.service';
import { Ligateam } from '../models/ligateam';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent implements OnInit {

  selectedFreePlayer : Player;
  selectedL1team: L1team;
  freePlayers: any;  
  l1teams: any;
  ligateam: Ligateam;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private recruitmentService : RecruitmentService,
    private l1teamService : L1teamService,
    private ligateamService : LigateamService,
  ) {}

  ngOnInit(): void {
//    this.getPlayer();
    this.getL1teams();
    this.getFreePlayers();
  }

/*  getPlayer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.recruitmentService.getPlayer(id)
      .subscribe(
        data => {
        this.leavingPlayer = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
*/

  getFreePlayersOfOneL1team(l1team: L1team): void {
      this.recruitmentService.getFreePlayersOfOneL1team(l1team.id)
        .subscribe(
          data => {
          this.freePlayers = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  getFreePlayers(): void {
    this.recruitmentService.getFreePlayers()
      .subscribe(
        data => {
        this.freePlayers = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

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

  onSelectPlayer(player: Player): void {
    this.selectedFreePlayer = player;
  }

  l1teamSelection(l1team: L1team): void {
    this.selectedL1team = l1team;
    this.getFreePlayersOfOneL1team(this.selectedL1team); 
  }

  allL1teamSelection(): void {
    console.log("allL1teamSelection :");
    this.getFreePlayers(); 
  }

  onValidate(coming: Player): void {

    const id = +this.route.snapshot.paramMap.get('id');
    console.log ("Param URL ligateam.id", id)
    let chemin = '';
    chemin += '/compo/' + id
    
    // Update the comming player state & ligateamId 
    const comingPlayerData = {
      state: "first",
      ligateamId: id,
    };

    this.recruitmentService.putPlayer(coming.id, comingPlayerData)
      .subscribe(
        data => {
          this.l1teams = data;
          console.log("UPDATE :",data);

          // Récupère l'objet ligateam pour envoyer 
          // la notifification de recrutement via DISCORD
          this.ligateamService.getLigateam(id)
          .subscribe(
            data => {
              this.ligateam = data;
              console.log("LIGATEAM :",data);
              this.sendMessage(coming.player_name.toUpperCase() + " rejoint " + this.ligateam.ligateam_name.toUpperCase());
              this.router.navigate([chemin])          
            },
            error => {
              console.log(error);
            });

        },
        error => {
          console.log(error);
        });
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

  goBack(): void {
    this.location.back();
  }

}

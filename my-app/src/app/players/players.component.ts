import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PlayersService } from '../services/players.service';
import { RecruitmentService } from '../services/recruitment.service';
import { L1teamService } from '../services/l1team.service';
import { ViewModelPlayer } from '../models/viewmodelPlayers';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  l1teams: any;
  players: any;
  viewModelPlayers: ViewModelPlayer[] = [];
  isViewModelVisible: boolean = false;
  tableColumns = ['index', 'clubl1', 'poste', 'joueur', 'points', 'clubliga'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private playersService : PlayersService,
    private recruitmentService : RecruitmentService,
    private l1teamService : L1teamService,    
  ) { }

  ngOnInit(): void {
    this.getL1teams();
    this.getViewModelPlayers();
  }

   /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */

  sendMessage() {
    var request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/778305478513393664/UyZCJQbLC63uSYo7gZ3eCsSx5TbGYfJhYpuVdn2EPoZ61PyCtjFTYe-BEgLlGZvkQsnc");

    request.setRequestHeader('Content-type', 'application/json');

    var params = {
      username: "LIGA",
      avatar_url: "",
      content: "My test message to send"
    }

    request.send(JSON.stringify(params));
  }

  getPlayers(): void {
    this.playersService.getPlayers()
      .subscribe(
        data => {
        this.players = data;
        console.log("players : ",this.players);
      },
      error => {
        console.log(error);
      });
  }

  private async getViewModelPlayers() {

    this.getPlayers();
    // sans cette tempo cela ne fonctionne pas
    await this.delay(1000);


    for (let player of this.players) {
      if (player.ligateam == null && player.l1team == null) {
        this.viewModelPlayers.push({ligateam_name: "---", player_name: player.player_name, position: player.position, point: player.point, l1team_name: "---"});
      } else if (player.ligateam == null) {
        this.viewModelPlayers.push({ligateam_name: "---", player_name: player.player_name, position: player.position, point: player.point, l1team_name: player.l1team.l1team_name});
      } else if ((player.l1team == null)) {
        this.viewModelPlayers.push({ligateam_name: player.ligateam.ligateam_name, player_name: player.player_name, position: player.position, point: player.point, l1team_name: "---"});
      } else {
        this.viewModelPlayers.push({ligateam_name: player.ligateam.ligateam_name, player_name: player.player_name, position: player.position, point: player.point, l1team_name: player.l1team.l1team_name});
      }
    };
    
    console.log("getViewModelPlayers() - RES", this.viewModelPlayers);
    this.isViewModelVisible=true;

  }

  private delay(ms: number)
  {
    /// sans le delay ça coince ...    
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getL1teams(): void {

    this.l1teamService.getL1teams()
      .subscribe(
        data => {
          this.l1teams = data;
          console.log("l1teams : ",this.l1teams);
        },
        error => {
          console.log(error);
        });
  }

  goBack(): void {
    this.location.back();
  }

}


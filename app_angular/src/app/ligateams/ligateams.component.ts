import { Component, OnInit } from '@angular/core';
import { LigateamService } from '../services/ligateam.service';
import { Ligateam } from '../models/ligateam';
import { LIGATEAMS } from '../mocks/mock-liga';

@Component({
  selector: 'app-ligateams',
  templateUrl: './ligateams.component.html',
  styleUrls: ['./ligateams.component.css']
})
export class LigateamsComponent implements OnInit {
 
  error = '';
  success = '';
  inconsistentTeam = false;
  // utile pour tableau material
  // tableColumns  :  string[] = ['index', 'ligateam_name', 'points','conformity'];
  ligateams: Ligateam []; 
  // TODO : à utiliser après la MAJ des équipes
  ligateamsAlert: boolean = false;


//  private static sortLigateamsArray( ligateams: Ligateam []): Ligateam[] {
//    return ligateams.sort((a: Ligateam, b: Ligateam) => {
//      return (a.points < b.points) ? -1 : 2;
//    });
//  }

  constructor(private ligateamService: LigateamService) { }

  ngOnInit() {
    this.getLigateams();
  }

  getLigateams(): void {
    this.ligateamService.getAllLigateams()
      .subscribe(
        data => {
          this.ligateams = data;
          console.log("ligateamsConformity : ",this.ligateams)
          this.ligateamsConformity(this.ligateams);
        },
        error => {
          console.log(error);
        });
  }

  ligateamsConformity(ligateams: Ligateam []):void {
    for (let ligateam of ligateams) {
      if (ligateam.conformity != 0) {
        this.ligateamsAlert = true;
      }
    }
  } 

}

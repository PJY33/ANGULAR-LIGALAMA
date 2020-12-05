import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { LigateamsComponent} from './ligateams/ligateams.component';
import { RecruitmentComponent} from './recruitment/recruitment.component';
import { PlayersComponent } from './players/players.component';
import { AdminComponent } from './admin/admin.component';
import { ImportComponent } from './import/import.component';
import { RoundComponent } from './round/round.component';



import { LigateamDetailComponent } from './ligateam-detail/ligateam-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/teams', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'teams', component: LigateamsComponent },
  { path: 'compo/:id', component: LigateamDetailComponent },
  { path: 'recrutement/:id', component: RecruitmentComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'import', component: ImportComponent },
  { path: 'rounds', component: RoundComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

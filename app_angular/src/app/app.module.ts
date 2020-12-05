import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatTableModule } from '@angular/material/table';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';
import { LigateamsComponent } from './ligateams/ligateams.component';
import { AppRoutingModule } from './app-routing.module';
import { LigateamDetailComponent } from './ligateam-detail/ligateam-detail.component';
import { MenuComponent } from './menu/menu.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { PlayersComponent } from './players/players.component';
import { ReplaceNullWithTextPipe } from './replace-null-with-text.pipe';
import { AdminComponent } from './admin/admin.component';
import { ImportComponent } from './import/import.component';
import { RoundComponent } from './round/round.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    NgbModule,
  ],
  exports: [
    MatTableModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    LigateamsComponent,
    LigateamDetailComponent,
    MenuComponent,
    RecruitmentComponent,
    PlayersComponent,
    ReplaceNullWithTextPipe,
    AdminComponent,
    ImportComponent,
    RoundComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}

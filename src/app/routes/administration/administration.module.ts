import { NgModule } from '@angular/core';

import { AdministrationRoutingModule } from './administration-routing.module';
import { HistoryRankingComponent } from './history-ranking/history-ranking.component';
import { ValenciaCircuitComponent } from './valencia-circuit/valencia-circuit.component';
import { BasquestsComponent } from './basquests/basquests.component';
import { RacesComponent } from './races/races.component';
import { PersonsComponent } from './persons/persons.component';
import { SharedModule } from '@shared/shared.module';
import { PersonEditComponent } from './persons/edit/person.component';
import { PersonService } from './person.service';
import { RaceEditComponent } from './races/edit/race.component';
import { RaceService } from './race.service';
import { RaceAddComponent } from './races/add/race-add.component';
import { RunnerEditComponent } from './runner/edit/runner-edit.component';
import { LeagueService } from './league.service';
import { ValenciaCircuitAddComponent } from './valencia-circuit/add/valencia-circuit-add.component';
import { ValenciaCircuitEditComponent } from './valencia-circuit/edit/valencia-circuit-edit.component';


const COMPONENTS: any[] = [
  HistoryRankingComponent,
  ValenciaCircuitComponent,
  BasquestsComponent,
  RacesComponent,
  PersonsComponent
];
const COMPONENTS_DYNAMIC: any[] = [PersonEditComponent, RaceEditComponent,
  RaceAddComponent, RunnerEditComponent,
  ValenciaCircuitAddComponent, ValenciaCircuitEditComponent];

@NgModule({
  imports: [SharedModule, AdministrationRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  providers: [PersonService, RaceService, LeagueService]
})
export class AdministrationModule { }

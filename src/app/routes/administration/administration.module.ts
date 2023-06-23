import { NgModule } from '@angular/core';

import { AdministrationRoutingModule } from './administration-routing.module';
import { HistoryRankingComponent } from './history-ranking/history-ranking.component';
import { ValenciaCircuitComponent } from './valencia-circuit/valencia-circuit.component';
import { BasquestsComponent } from './basquests/basquests.component';
import { RacesComponent } from './races/races.component';
import { PersonsComponent } from './persons/persons.component';
import { SharedModule } from '@shared/shared.module';


const COMPONENTS: any[] = [
  HistoryRankingComponent,
  ValenciaCircuitComponent,
  BasquestsComponent,
  RacesComponent,
  PersonsComponent
];
const COMPONENTS_DYNAMIC: any[] = [];


@NgModule({
  imports: [SharedModule, AdministrationRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class AdministrationModule { }

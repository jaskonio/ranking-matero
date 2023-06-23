import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { HistoryRankingComponent } from './history-ranking/history-ranking.component';
import { ValenciaCircuitComponent } from './valencia-circuit/valencia-circuit.component';
import { BasquestsComponent } from './basquests/basquests.component';
import { RacesComponent } from './races/races.component';
import { PersonsComponent } from './persons/persons.component';


@NgModule({
  declarations: [
    HistoryRankingComponent,
    ValenciaCircuitComponent,
    BasquestsComponent,
    RacesComponent,
    PersonsComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }

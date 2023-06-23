import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasquestsComponent } from './basquests/basquests.component';
import { PersonsComponent } from './persons/persons.component';
import { RacesComponent } from './races/races.component';
import { HistoryRankingComponent } from './history-ranking/history-ranking.component';
import { ValenciaCircuitComponent } from './valencia-circuit/valencia-circuit.component';

const routes: Routes = [
  { path: 'historyRanking', component: HistoryRankingComponent },
  { path: 'valenciaCircuit', component: ValenciaCircuitComponent },
  { path: 'basquests', component: BasquestsComponent },
  { path: 'races', component: RacesComponent },
  { path: 'persons', component: PersonsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }

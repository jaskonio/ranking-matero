import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherLeaguesMaratonComponent } from './maraton/maraton.component';
import { OtherLeaguesMMaratonComponent } from './mmraton/mmaraton.component';
import { OtherLeagues15kComponent } from './15k/15k.component';
import { OtherLeagues10kComponent } from './10k/10k.component';


const routes: Routes = [
  { path: 'maraton', component: OtherLeaguesMaratonComponent },
  { path: 'mmaraton', component: OtherLeaguesMMaratonComponent },
  { path: '15k', component: OtherLeagues15kComponent },
  { path: '10k', component: OtherLeagues10kComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherLeaguesRoutingModule {}

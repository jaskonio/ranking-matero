import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OtherLeaguesRoutingModule } from './other-leagues-routing.module';
import { OtherLeaguesMaratonComponent } from './maraton/maraton.component';
import { OtherLeaguesMMaratonComponent } from './mmraton/mmaraton.component';
import { OtherLeagues15kComponent } from './15k/15k.component';
import { OtherLeagues10kComponent } from './10k/10k.component';


const COMPONENTS: any[] = [OtherLeaguesMaratonComponent, OtherLeaguesMMaratonComponent,
  OtherLeagues15kComponent, OtherLeagues10kComponent];

const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, OtherLeaguesRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class OtherLeaguesModule {}

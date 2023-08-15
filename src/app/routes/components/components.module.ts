import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './all/components.component';


const COMPONENTS: any[] = [
  ComponentsComponent
];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [SharedModule, ComponentsRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class ComponentsModule {}

import { NgModule } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { CommonModule } from '@angular/common';
import { AgentlistComponent ,AgenteditComponent} from './components';
import { routing } from './agentmanager.routing';
import { CbdkMain } from './agentmanager.main';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSpinKitModule } from 'ng-spin-kit';
//services
import {agentmanagerServices} from './services';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    NgbModule,
    NgSpinKitModule,
  ],
  declarations: [
    CbdkMain,
    AgentlistComponent,
    AgenteditComponent
  ],
  providers:[
    agentmanagerServices
  ],
  entryComponents:[
    AgenteditComponent
  ]
})
export class AgentManagerModule { }

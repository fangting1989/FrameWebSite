import { NgModule } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { CommonModule } from '@angular/common';
import { TicketComponent,TicketeditComponent } from './components';
import { routing } from './ticketmanager.routing';
import { CbdkMain } from './ticketmanager.main';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSpinKitModule } from 'ng-spin-kit';
//services
import {ticketmanagerServices} from './services';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    NgbModule,
    NgSpinKitModule
  ],
  declarations: [
    CbdkMain,
    TicketComponent,
    TicketeditComponent,
  ],
  providers:[
    ticketmanagerServices
  ]
})
export class TicketManagerModule { }

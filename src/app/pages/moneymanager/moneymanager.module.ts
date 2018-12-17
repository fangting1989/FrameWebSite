import { NgModule } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { CommonModule } from '@angular/common';
import { MoneyComponent,MoneylistComponent,CompareresultComponent,InputmoneyComponent } from './components';
import { routing } from './moneymanager.routing';
import { CbdkMain } from './moneymanager.main';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSpinKitModule } from 'ng-spin-kit';
//services
import {moneymanagerServices} from './services';
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
    MoneyComponent,
    MoneylistComponent,
    CompareresultComponent,
    InputmoneyComponent
  ],
  providers:[
    moneymanagerServices
  ],
  entryComponents:[
    MoneylistComponent,
    CompareresultComponent,
    InputmoneyComponent
  ]
})
export class MoneyManagerModule { }

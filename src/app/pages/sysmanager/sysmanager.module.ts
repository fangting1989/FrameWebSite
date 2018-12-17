import { NgModule } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { CommonModule } from '@angular/common';
import { routing } from './sysmanager.routing';
import { SysmanagerMain } from './sysmanager.main';
import { NgSpinKitModule } from 'ng-spin-kit';
import {
  NgbModule,
  NgbPaginationConfig
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { Select2Module } from 'ng2-select2';
import {
  UserlistComponent,
  RolelistComponent,
  EnumerationComponent,
  EnumvalueEditComponent,
  CompanymanageComponent,
  CompanyEditComponent
} from './components';

//services
import { sysmanagerServices } from './services';
import { ModulemanagerComponent } from './components/modulemanager/modulemanager.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    NgbModule,
    AngularSplitModule,
    Select2Module,
    NgSpinKitModule
  ],
  declarations: [
    SysmanagerMain,
    RolelistComponent,
    UserlistComponent,
    EnumerationComponent,
    EnumvalueEditComponent,
    CompanymanageComponent,
    CompanyEditComponent,
    ModulemanagerComponent
  ],
  providers: [
    sysmanagerServices
  ],
  entryComponents: [
    EnumvalueEditComponent,
    CompanyEditComponent
  ]
})
export class SysmanagerModule {
  constructor(
    private config: NgbPaginationConfig
  ) {
    config.rotate = true;
    config.ellipses = true;
    config.maxSize = 5;
    config.boundaryLinks = true;
  }
}

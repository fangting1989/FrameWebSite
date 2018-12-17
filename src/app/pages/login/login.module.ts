import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Login } from './login.component';
import { routing } from './login.routing';
import { CoolStorageModule } from 'angular2-cool-storage';
import {loginServices} from './services'
 
@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    CoolStorageModule
  ],
  declarations: [
    Login
  ],
  providers:[
    loginServices
  ]
})
export class LoginModule {}

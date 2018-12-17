import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import { ChangepasswordComponent } from './../theme/components';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AuthGuard } from './auth-guard';

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing, SlimLoadingBarModule.forRoot()],
  declarations: [Pages],
  entryComponents: [ChangepasswordComponent],
  providers: [AuthGuard]

})
export class PagesModule {
}

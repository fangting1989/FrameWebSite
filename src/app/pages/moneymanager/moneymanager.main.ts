import { Component } from '@angular/core';
import { GlobalState } from './../../global.state'

@Component({
  selector: 'cbdk-main',
  template: `<router-outlet></router-outlet>`
})
export class CbdkMain {

  constructor(private _state: GlobalState) {
    this._state.notifyDataChanged('app.nav', { level: 1, NavName: "财务结算", routerLink: "/money" });
  }
}

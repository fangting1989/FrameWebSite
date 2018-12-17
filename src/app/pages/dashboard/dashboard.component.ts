import {Component} from '@angular/core';
import { GlobalState} from './../../global.state'
@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  constructor(private _state:GlobalState) {
    this._state.notifyDataChanged('app.nav', {level: 0, NavName: "首页", routerLink: "/pages/dashboard" });
  }

}

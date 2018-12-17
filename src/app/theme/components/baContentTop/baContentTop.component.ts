import { Component } from '@angular/core';
import { GlobalState } from '../../../global.state';
import { CoolLocalStorage } from 'angular2-cool-storage';
import { Router } from '@angular/router';
import { _ } from 'underscore';
@Component({
  selector: 'ba-content-top',
  styleUrls: ['./baContentTop.scss'],
  templateUrl: './baContentTop.html',
})
export class BaContentTop {
  public isMenuCollapsed:boolean = false;
  public activePageTitle: string = '';
  model: any = null;
  NavArray: any = [];
  SysConfig:any = {};
  constructor(
    private _state: GlobalState,
    private CoolLocalStorage: CoolLocalStorage,
    private Router: Router
  ) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        this.activePageTitle = activeLink.title;
      }
    });
    //菜单
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.NavArray.push({ level: 0, NavName: "首页", routerLink: "/pages/dashboard" })
    var self = this;
    //接收面包屑
    this._state.subscribe('app.nav', (navObj) => {
      //去除
      this.NavArray = _.filter(this.NavArray, function (obj) { return obj.level < navObj.level; });
      var Index = _.findIndex(this.NavArray, { "level": navObj.level });
      if (Index > -1)
        self.NavArray.splice(Index, 1);
      self.NavArray.push(navObj);
      self.NavArray.sort(function (a, b) {
        return a.level - b.age
      });
    });

    var objToken = this.CoolLocalStorage.getObject(WebConfig.cookieKeyName)
    this.model = objToken;
    this.SysConfig =WebConfig;
    if(!this.SysConfig.PlatFormName){
      this.SysConfig.PlatFormName = "后台管理"
    }
  }

  ChangePassWord() {
    var objData = {
      type: 'change'
    }
    this._state.notifyDataChanged('user.repasswordclick', objData);
  }

  LoginOut() {
    //清除
    this.Router.navigate(['/login']);
    this._state.DelCookie(WebConfig.cookieToken);
    this.CoolLocalStorage.removeItem(WebConfig.cookieKeyName)
  }
  MenuCollapsedClick(){
    this.menuCollapseStateChange(true)
  }
  public menuCollapseStateChange(isCollapsed:boolean):void {
    // this.isMenuCollapsed = isCollapsed;
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }
}

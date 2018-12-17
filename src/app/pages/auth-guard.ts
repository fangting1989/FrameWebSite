import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { CoolLocalStorage } from 'angular2-cool-storage';
import { GlobalState } from '../global.state';
import { Router } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private localStorage: CoolLocalStorage,
    private _state: GlobalState,
    private Router: Router
  ) {
    this.localStorage = localStorage;
  }
  canActivate() {
    let objToken = this._state.GetCookie(WebConfig.cookieToken);
    if (objToken != null && objToken != '') {
      return true;
    } else {
      if(WebConfig.Token){
        this.Router.navigate(['/login']);
      }else{
        return true; 
      }
      // return false;
    }
  }
  canActivateChild() {
    let objToken = this._state.GetCookie(WebConfig.cookieToken);
    if (objToken != null && objToken != '') {
      return true;
    } else {
      if(WebConfig.Token){
        this.Router.navigate(['/login']);
      }else{
        return true; 
      }
    }
  }



}

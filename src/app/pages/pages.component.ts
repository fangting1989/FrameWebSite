import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import { GlobalState } from './../global.state';
import { ChangepasswordComponent } from './../theme/components';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SlimLoadingBarService, SlimLoadingBarEvent } from 'ng2-slim-loading-bar';
import { baseServices } from './../theme/services';
import { _ } from 'underscore';
import { timeout } from 'rxjs/operators/timeout';
// import { setTimeout } from 'timers';
import { CoolLocalStorage } from 'angular2-cool-storage';
@Component({
  selector: 'pages',
  template: `
  <div class="ly-top-content">
    <ba-content-top></ba-content-top>
  </div>
    <div class="al-main" balayoutmain >
      <ba-sidebar></ba-sidebar>
        <ng2-slim-loading-bar></ng2-slim-loading-bar>
          <div class="al-content">
            <router-outlet></router-outlet>
          </div>
    </div>
    <ba-back-top position="200"></ba-back-top>
    `
  //<div class="al-footer-main clearfix">
  //<div class="al-copy">&copy; <a href="javascript:;" translate></a> 2016</div>
  //</div>
  // <footer class="al-footer clearfix">
  //     <div class="al-footer-right" translate>技术服务<i class="ion-heart"></i> 杭州瑞懿科技有限公司</div>
  //   </footer>
  // // <ba-page-top></ba-page-top>
})
export class Pages {
  MainclientHeight:any ;
  constructor(
    private _menuService: BaMenuService,
    private _state: GlobalState,
    private modalService: NgbModal,
    private _loadingBar: SlimLoadingBarService,
    private baseServices: baseServices,
    private CoolLocalStorage: CoolLocalStorage,
  ) {

    this._state.subscribe('user.repasswordclick', (isCollapsed) => {
      const activeModal = this.modalService.open(ChangepasswordComponent);
      activeModal.componentInstance.modalHeader = '修改密码';
    });

    // this._loadingBar.events.subscribe((item: SlimLoadingBarEvent) => {
    //   console.log(item)
    // });
    if (_state.SlimLoading) {
      this._state.output$.subscribe(v => {
        if (v == 'start') {
          this._loadingBar.start(() => {
            console.log('Loading complete');
          });
        } else if (v == 'stop') {
          this._loadingBar.stop();
        } else if (v == 'complete') {
          this._loadingBar.complete();
        }
      })
    }

  }

  ngOnInit() {
    // this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
    this.baseServices.getData("systemController/findsm", {}).subscribe(result => {
      if (result != null) {
        this.loadMenus(result.data);
      }
    });
    this._state.subscribe('menuData', (menuArr) => {
      this.loadMenus(menuArr);
    })

    
  }
  loadMenus(arr) {
    var objToken = (Object)(this.CoolLocalStorage.getObject(WebConfig.cookieKeyName))
    let PAGES_MENUS = [
      {
        path: 'pages',
        children: []
      }]
    let childrenArr = [];
    // this.baseServices.getData("systemController/findsm", {}).subscribe(result => {
    // if (result != null) {
    var outArray = []
    if(objToken.usertype == 1){
      outArray.push({Systemname:"系统管理"})
    }else if(objToken.usertype > 1){
      outArray.push({Systemname:"系统管理"})
      outArray.push({Systemname:"财务结算"})
    }
    _.each(arr, (item, i) => {
      if(_.findIndex(outArray,{Systemname:item[0].Systemname}) == -1){
          PAGES_MENUS[0].children.push({
            path: item[0].Systemurl,
            data: {
              menu: {
                title: item[0].Systemname,
                icon: item[0].Systemicon,
                selected: false,
                expanded: false,
                order: 0
              }
            }
          })
          _.each(item, (data, f) => {
            if (f > 0) {
              childrenArr.push({
                path: data.Moduleurl,
                data: {
                  menu: {
                    title: data.Modulename,
                  }
                }
              })
            }
          });
          PAGES_MENUS[0].children[PAGES_MENUS[0].children.length - 1].children = childrenArr;
          childrenArr = [];
        }
    })
    // }
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENUS);
    // });
  }
}

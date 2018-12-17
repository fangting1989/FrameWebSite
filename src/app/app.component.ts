import { Component, ViewContainerRef } from '@angular/core';
import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { BaThemeConfig } from './theme/theme.config';
import { layoutPaths } from './theme/theme.constants';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  template: `
    <main [class.menu-collapsed]="isMenuCollapsed" baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {

  isMenuCollapsed: boolean = false;

  constructor(private _state: GlobalState,
              private _imageLoader: BaImageLoaderService,
              private _spinner: BaThemeSpinner,
              private viewContainerRef: ViewContainerRef,
              private themeConfig: BaThemeConfig,
              public toastr: ToastsManager,
              ) {

    themeConfig.config();

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });


    this._state.subscribe('Toast.Action.Show', (data) => {
      if(data.type == 'success'){
        this.toastr.success(data.content, null,{toastLife:1500});
      }else if(data.type == 'info'){
        this.toastr.info(data.content, null,{toastLife:1500});
      }else{
        this.toastr.error(data.content, null,{toastLife:2500});
      }
       
    });
    this.toastr.setRootViewContainerRef(viewContainerRef);
  }

  public ngAfterViewInit(): void {
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    // register some loaders
    BaThemePreloader.registerLoader(this._imageLoader.load('./assets/img/sky-bg.jpg'));
  }

}

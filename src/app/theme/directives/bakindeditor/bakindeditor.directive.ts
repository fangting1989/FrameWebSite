
import {Directive, HostBinding,ElementRef} from '@angular/core';
// import {KindEditor}  from  'kindeditor/kindeditor-all.js';
@Directive({
  selector: '[bakindeditor]'
})
export class BaKindEditor {

  private _classes:Array<string> = [];

  constructor(el: ElementRef) {
    // KindEditor.ready(function(K) {
    //   setTimeout(function(){
    //     K.create('#editor_id');
    //   },1000);
      // console.log("ready")
      // console.log(K)
         
    // });
  }

  // public ngOnInit():void {
  //   this._assignTheme();
  //   this._assignMobile();
  // }

  // private _assignTheme():void {
  //   this._addClass(this._baConfig.get().theme.name);
  // }

  // private _assignMobile():void {
  //   if (isMobile()) {
  //     this._addClass('mobile');
  //   }
  // }

  // private _addClass(cls:string) {
  //   this._classes.push(cls);
  //   this.classesString = this._classes.join(' ');
  // }
}

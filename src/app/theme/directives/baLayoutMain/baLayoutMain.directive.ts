
import {Directive, HostBinding,ElementRef,Renderer,HostListener} from '@angular/core';
@Directive({
  selector: '[balayoutmain]'
})
export class BaLayoutMain {

  private _renderer:any;
  private _element:any;

  constructor(el: ElementRef,renderer: Renderer) {
    this._renderer = renderer;
    this._element = el;
    if(document.body.clientWidth > 768){
      var MainClient = (document.body.clientHeight - 80) + 'px'
      renderer.setElementStyle(el.nativeElement, 'height',MainClient );
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize():void {
    if(document.body.clientWidth > 768){
      var MainClient = (document.body.clientHeight - 80) + 'px'
      this._renderer.setElementStyle(this._element.nativeElement, 'height',MainClient );
    }
  }
}

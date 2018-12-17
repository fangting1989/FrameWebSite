import {Pipe, PipeTransform} from '@angular/core';
import {layoutPaths} from '../../../theme';
import {_} from 'underscore';
@Pipe({name: 'baImagesType'})
export class BaImagesTypePipe implements PipeTransform {

  transform(items: any[], filter: any):any {
    var data = {};
    data = filter;
    if (!items || !filter) {
            return items;
    }
    var filterCon = filter.value
    return _.filter(items,function(obj){return obj.businessType == filterCon}) 
  }
}

import { Injectable, Pipe } from '@angular/core';
import * as moment from "moment";
import {_} from 'underscore'
@Pipe({
  name: 'bapaystatepipe'
})
@Injectable()
export class baPayStatePipe {
  transform(value) {
    var retValue = ""
    try{
        _.each(WebConfig.PayStateArray,function(item){
          if(item.value == value){
            retValue = item.name;
          }
        })
        return retValue
    }
    catch(e){
        return value
    }
  }
}

import { Injectable, Pipe } from '@angular/core';
import * as moment from "moment";
import {_} from 'underscore'
@Pipe({
  name: 'bahkpaystatepipe'
})
@Injectable()
export class baHKPayStatePipe {
  transform(value) {
    var retValue = ""
    try{
        _.each(WebConfig.HKPayStateArray,function(item){
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

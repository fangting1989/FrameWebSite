import { Injectable, Pipe } from '@angular/core';
import * as moment from "moment";
import {_} from 'underscore'
@Pipe({
  name: 'baagenttype'
})
@Injectable()
export class baAgentTypePipe {
  transform(value) {
    var retValue = ""
    try{
      var AgentTypeArray = WebConfig.AgentTypeArray
      if(_.findIndex(AgentTypeArray,{value:10}) == -1){
        AgentTypeArray.push({value:10,name:"个人"})
      }
        _.each(AgentTypeArray,function(item){
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

import { Injectable, Pipe } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'badateformatpipe'
})
@Injectable()
export class baDateformatPipe {
  transform(value, args) {
    if(typeof args == 'undefined' || args == null){
        return value;
    }
    try{
        return moment(value).format(args)
    }
    catch(e){
        return value
    }
  }
}

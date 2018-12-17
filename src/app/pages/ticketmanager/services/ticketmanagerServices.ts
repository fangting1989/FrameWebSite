import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {baseServices} from './../../../theme/services';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ticketmanagerServices {
    constructor(public http:Http,public baseServices:baseServices) { 
    }

    //票列表
    public findTicket(data):any{
        return this.baseServices.getData("ticketsController/find",data)
    }
    //票列表
    public InsertTicket(data):any{
        return this.baseServices.postData("ticketsController/insert",data)
    }
    public UpdateTicket(data):any{
        return this.baseServices.postData("ticketsController/update",data)
    }
    //票列表
    public DelTicket(data):any{
        return this.baseServices.getData("ticketsController/del",data)
    }
    //获得代理名称列表
    public findDL(data):any{
        return this.baseServices.getData("dlController/find", data)
    }
    
    public UploadFile(data):any{
        return this.baseServices.UploadFile("ticketsController/Fileupload", data)
    }
}
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {baseServices} from './../../../theme/services';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class agentmanagerServices {
    constructor(public http:Http,public baseServices:baseServices) { 
    }

    //查询中介列表
    public findAgent(data):any{
        return this.baseServices.getData("dlController/find", data)
    }

    public AgentInsert(data):any{
        return this.baseServices.postData("dlController/insert", data)
    }

    public AgentUpdate(data):any{
        return this.baseServices.postData("dlController/update", data)
    }

    public AgentDel(data):any{
        return this.baseServices.getData("dlController/del", data)
    }

    


}
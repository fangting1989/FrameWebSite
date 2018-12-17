import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {baseServices} from './../../../theme/services';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class loginServices {
    constructor(public http:Http,public baseServices:baseServices) { 
    }

    //增加用户
    public login(data):any{
        return this.baseServices.postData("userController/login",data)
    }
}
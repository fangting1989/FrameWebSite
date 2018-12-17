import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import {baseServices} from '../baseServices';

import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

@Injectable()
export class comServices {
    constructor(public baseServices:baseServices) { 
    }
    //修改密码
    public updatePassword(data):any{
        return this.baseServices.postData("admin/tUserController/updatePassword",data)
    }
    // 获取原来密码
     public judgePassword(data):any{
        return this.baseServices.postData("admin/tUserController/judgePassword",data)
    }
}
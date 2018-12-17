import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {baseServices} from './../../../theme/services';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class moneymanagerServices {
    constructor(public http:Http,public baseServices:baseServices) { 
    }

    //票列表
    public findTicket(data):any{
        return this.baseServices.getData("ticketsController/findCyc",data)
    }
    public findCycDetail(data):any{
        return this.baseServices.getData("ticketsController/findCycDetail",data)
    }
    public downloadCycDetail(data):any{
        return this.baseServices.DownLoadFile("ticketsController/downloadCycDetail",data,"导出文件.xlsx")
    }
    /*对比数据上传*/
    public HKTicketCompare(data):any{
        return this.baseServices.UploadFile("ticketsController/HKTicketCompare", data)
    }
    /*已结算*/
    public HKTicketPay(data):any{
        return this.baseServices.getData("ticketsController/HKTicketPay", data)
    }
    
    //-------------代理-------------
    //获得代理名称列表
    public findDL(data):any{
        return this.baseServices.getData("dlController/find", data)
    }
    public finddlCyc(data):any{
        return this.baseServices.getData("ticketsController/finddlCyc", data)
    }
    public finddlCycDetail(data):any{
        return this.baseServices.getData("ticketsController/finddlCycDetail", data)
    }
    public downloaddlCycDetail(data):any{
        return this.baseServices.DownLoadFile("ticketsController/downloaddlCycDetail", data,"导出文件.xlsx")
    }
    public dlinputmoney(data):any{
        return this.baseServices.getData("ticketsController/dlinputmoney", data)
    }
}
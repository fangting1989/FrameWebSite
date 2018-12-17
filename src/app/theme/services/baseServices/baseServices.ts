import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams ,RequestOptions,ResponseContentType} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { _ } from 'underscore'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GlobalState } from './../../../global.state';
import { Router } from '@angular/router';
import {saveAs as importedSaveAs} from "file-saver";

@Injectable()
export class baseServices {
    constructor(
        public http: Http,
        private _state: GlobalState,
        private Router: Router
    ) { }
    public getData(methodurl, data): any {
        let url = WebConfig.BaseUrl + methodurl;
        let mparams = new URLSearchParams();
        _.map(data, function (prop, key) {
            mparams.append(key, prop)
        })
        let mheaders = new Headers();
        mheaders.append("Token", typeof this._state.GetCookie(WebConfig.cookieToken) == "undefined" ? "" : this._state.GetCookie(WebConfig.cookieToken))
        return this.http.get(url, { search: mparams, headers: mheaders }).map((res: Response) => {
            let retData = res.json();
            if (typeof retData.token == 'undefined') {
                //错误处理
            }
            if(WebConfig.Token){
                if (retData.token == '') {
                    this.Router.navigate(['/login']);
                }
            }
            if (typeof retData.errid != 'undefined' && retData.errid < 0) {
                this._state.notifyDataChanged('Toast.Action.Show', { content: retData.errmsg, type: 'error' });
                return null
            }
            this._state.SetCookie(WebConfig.cookieToken, retData.token, 's1200');
            return retData;
        }).catch((error: any) => {
            this._state.notifyDataChanged('Toast.Action.Show', { content: '网络请求错误', type: 'error' });
            return null;
        })
    }

    public postData(methodurl, data): any {
        let url = WebConfig.BaseUrl + methodurl;
        let mheaders = new Headers();
        //插入兼职
        mheaders.append("Token", typeof this._state.GetCookie(WebConfig.cookieToken) == "undefined" ? "" : this._state.GetCookie(WebConfig.cookieToken))
        return this.http.post(url, data, { headers: mheaders }).map((res: Response) => {
            let retData = res.json();
            if (typeof retData.token == 'undefined') {
                //错误处理
            }
            if(WebConfig.Token){
                if (retData.token == '') {
                    this.Router.navigate(['/login']);
                }
            }
            if (typeof retData.errid != 'undefined' && retData.errid < 0) {
                this._state.notifyDataChanged('Toast.Action.Show', { content: retData.errmsg, type: 'error' });
                return null;
            }
            this._state.SetCookie(WebConfig.cookieToken, retData.token, 's1200');
            return retData;
        }).catch((error: any) => {
            this._state.notifyDataChanged('Toast.Action.Show', { content: '网络请求错误', type: 'error' });
            return null;
        })
    }

    public UploadFile(methodurl, data): any {
        let url = WebConfig.BaseUrl + methodurl;
        let mheaders = new Headers({'X-Requested-With': 'XMLHttpRequest'});
        //插入兼职
        return this.http.post(url, data, { headers: mheaders }).map((res: Response) => {
            let retData = res.json();
            if (typeof retData.token == 'undefined') {
                //错误处理
            }
            if(WebConfig.Token){
                if (retData.token == '') {
                    this.Router.navigate(['/login']);
                }
            }
            if (typeof retData.errid != 'undefined' && retData.errid < 0) {
                this._state.notifyDataChanged('Toast.Action.Show', { content: retData.errmsg, type: 'error' });
                return null;
            }
            this._state.SetCookie(WebConfig.cookieToken, retData.token, 's1200');
            return retData;
        }).catch((error: any) => {
            this._state.notifyDataChanged('Toast.Action.Show', { content: '网络请求错误', type: 'error' });
            return null;
        })
    }

    public DownLoadFile(methodurl, data,filename): any {
        let url = WebConfig.BaseUrl + methodurl;
        let mparams = new URLSearchParams();
        _.map(data, function (prop, key) {
            mparams.append(key, prop)
        })
        let mheaders = new Headers();
        // var options = {} { search: mparams, headers: mheaders }
        mheaders.append("Token", typeof this._state.GetCookie(WebConfig.cookieToken) == "undefined" ? "" : this._state.GetCookie(WebConfig.cookieToken))
        let options = new RequestOptions({search:mparams,headers: mheaders,responseType: ResponseContentType.Blob });
        return this.http.get(url, options).map((res: Response) => {
            importedSaveAs(res.blob(),filename)
            return null;
        }).catch((error: any) => {
            this._state.notifyDataChanged('Toast.Action.Show', { content: '网络请求错误', type: 'error' });
            return null;
        })
    }

    
}

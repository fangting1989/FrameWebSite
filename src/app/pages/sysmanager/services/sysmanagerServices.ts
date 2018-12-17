import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { baseServices } from './../../../theme/services';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class sysmanagerServices {
    constructor(public http: Http, public baseServices: baseServices) {
    }
    //用户列表
    public userList(data): any {
        return this.baseServices.postData("memberController/insert", data)
    }

    //类别列表
    public typeList(data): any {
        return this.baseServices.getData("explaintypeController/find", data)
    }
    //类别详情
    public getTypeDetail(data): any {
        return this.baseServices.getData("explaintypeController/Get", data)
    }
    //类别编辑
    public upTypeItem(data): any {
        return this.baseServices.postData("explaintypeController/update", data)
    }
    //类别添加
    public inTypeItem(data): any {
        return this.baseServices.postData("explaintypeController/insert", data)
    }
    //类别删除
    public deTypeItem(data): any {
        return this.baseServices.getData("explaintypeController/del", data)
    }
    //枚举列表
    public ItemList(data): any {
        return this.baseServices.getData("explainController/findLB", data)
    }
    //枚举详情
    public getEnumDetail(data): any {
        return this.baseServices.getData("explainController/Get", data)
    }
    //枚举编辑
    public upEnumItem(data): any {
        return this.baseServices.postData("explainController/update", data)
    }
    //枚举添加
    public inEnumItem(data): any {
        return this.baseServices.postData("explainController/insert", data)
    }
    //枚举删除
    public deEnumItem(data): any {
        return this.baseServices.getData("explainController/del", data)
    }
    //枚举值
    public enumValueList(data): any {
        return this.baseServices.getData("enumController/findID", data)
    }
    //枚举值添加
    public inEnumValue(data): any {
        return this.baseServices.postData("enumController/insert", data)
    }
    //枚举值详情
    public getEnumValueDetail(data): any {
        return this.baseServices.getData("enumController/Get", data)
    }
    //枚举值编辑
    public upEnumValueItem(data): any {
        return this.baseServices.postData("enumController/update", data)
    }
    //枚举值删除
    public deEnumValueItem(data): any {
        return this.baseServices.getData("enumController/del", data)
    }
    //用户类别
    public findUserType(data): any {
        return this.baseServices.getData("usertypeController/find", data)
    }
    //用户类别详情
    public getUserTypeDetail(data): any {
        return this.baseServices.getData("usertypeController/get", data)
    }
    //用户类别编辑
    public upUserType(data): any {
        return this.baseServices.postData("usertypeController/update", data)
    }
    //用户类别添加
    public inUserType(data): any {
        return this.baseServices.postData("usertypeController/insert", data)
    }
    //用户类别删除
    public deUserType(data): any {
        return this.baseServices.getData("usertypeController/del", data)
    }
    //用户
    public findUser(data): any {
        return this.baseServices.getData("userController/findId", data)
    }
    //用户详情
    public getUserDetail(data): any {
        return this.baseServices.getData("userController/get", data)
    }
    //用户添加
    public inUser(data): any {
        return this.baseServices.postData("userController/insert", data)
    }
    //用户编辑
    public upUser(data): any {
        return this.baseServices.postData("userController/update", data)
    }
    //用户删除
    public deUser(data): any {
        return this.baseServices.getData("userController/del", data)
    }
    //角色类别
    public findRoleType(data): any {
        return this.baseServices.getData("roletypeController/find", data)
    }
    //角色类别详情
    public getRoleTypeDetail(data): any {
        return this.baseServices.getData("roletypeController/get", data)
    }
    //角色类别添加
    public inRoleType(data): any {
        return this.baseServices.postData("roletypeController/insert", data)
    }
    //角色类别删除
    public deRoleType(data): any {
        return this.baseServices.getData("roletypeController/del", data)
    }

    //角色
    public findRole(data): any {
        return this.baseServices.getData("roleController/findId", data)
    }
    //角色项详情
    public getRoleDetail(data): any {
        return this.baseServices.getData("roleController/get", data)
    }
    //角色添加
    public inRole(data): any {
        return this.baseServices.postData("roleController/insert", data)
    }
    //角色编辑
    public upRole(data): any {
        return this.baseServices.postData("roleController/update", data)
    }
    //角色删除
    public deRole(data): any {
        return this.baseServices.getData("roleController/del", data)
    }
    //公司列表
    public companyList(data): any {
        return this.baseServices.getData("enterprise_baseController/find", data)
    }
    //公司详情
    public getCompanyDetail(data): any {
        return this.baseServices.getData("enterprise_baseController/get", data)
    }
    //公司保存
    public upCompanyData(data): any {
        return this.baseServices.postData("enterprise_baseController/update", data)
    }

    //系统
    public findSystem(data): any {
        return this.baseServices.getData("systemController/find", data)
    }
    //系统详情
    public getSystem(data): any {
        return this.baseServices.getData("systemController/get", data)
    }
    //系统编辑
    public upSystem(data): any {
        return this.baseServices.postData("systemController/update", data)
    }
    //系统添加
    public inSystem(data): any {
        return this.baseServices.postData("systemController/insert", data)
    }
    //系统删除
    public delSystem(data): any {
        return this.baseServices.getData("systemController/del", data)
    }
    //模块
    public findmodule(data): any {
        return this.baseServices.getData("moduleController/findSid", data)
    }
    //模块详情
    public getmodule(data): any {
        return this.baseServices.getData("moduleController/get", data)
    }
    //模块编辑
    public upModule(data): any {
        return this.baseServices.postData("moduleController/update", data)
    }
    //模块添加
    public inModule(data): any {
        return this.baseServices.postData("moduleController/insert", data)
    }
    //模块删除
    public delModule(data): any {
        return this.baseServices.getData("moduleController/del", data)
    }
    //系统模块数据
    public menuList(data): any {
        return this.baseServices.getData("systemController/findsm", data)
    }
}
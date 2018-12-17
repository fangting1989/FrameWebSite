import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ticketmanagerServices } from '../../services';
import {_} from 'underscore';
import * as moment from 'moment'
import {Router,ActivatedRoute} from '@angular/router';
import { GlobalState } from '../../../../global.state';
@Component({
  selector: 'app-ticketedit',
  templateUrl: './ticketedit.component.html',
  styleUrls: ['./ticketedit.component.scss']
})
export class TicketeditComponent implements OnInit {

  model:any = {}
  AirLineArray:any =Object.assign([],WebConfig.AirLineArray)
  DLTypeArray:any = Object.assign([],WebConfig.AgentTypeArray)
  PAYSTATEArray:any =Object.assign([],WebConfig.PayStateArray)
  DLNameArray:any = []
  hasTicketsCode:any = false;
  FuncCheck:any;
  setting:any = {
    showDlSelect:true,
    showPayState:false
  }
  paramData:any = {};
  loadingState:any = true;
  constructor(private location: Location,
    private ticketmanagerServices:ticketmanagerServices,
    private _state: GlobalState,
    private activatedroute: ActivatedRoute, 
  ) { }

  ngOnInit() {

    this.activatedroute
      .queryParams
      .subscribe(params => {
        this.paramData = params
        if(typeof this.paramData.code != 'undefined'){
          this.model.code = this.paramData.code
          this.LoadData();
        }
      });
    if(_.findIndex(this.DLTypeArray,{value:10})  == -1){
      this.DLTypeArray.push({value:10,name:"个人"})
    }
    console.log("1-1-")
    this.FuncCheck =  _.debounce(this.CheckTicketCode, 800);
  }

  goBack(){
    this.location.back();
  }
  LoadData(){
    var postData = {
      TICKETS_ID:this.model.code
    }
    this.ticketmanagerServices.findTicket(postData).subscribe(result => {
      if(result && result.data.length){
        this.model = result.data[0]
        //设置出票日期
        this.model.TICKETS_DATEObject = {
          year:parseInt(moment(this.model.TICKETS_DATE).format("YYYY")),
          month:parseInt(moment(this.model.TICKETS_DATE).format("MM")),
          day:parseInt(moment(this.model.TICKETS_DATE).format("DD"))
        }
        //加载代理
        if(this.model.DLTYPE != 10){
          this.model.SelDLNAME = this.model.DLNAME
          this.setting.showDlSelect = true;
        }else{
          this.model.GR_DLNAME = this.model.DLNAME
          this.setting.showDlSelect = false;
        }
        this.LoadTypeName(this.model.DLTYPE)
        
      }
    })
    
  }
  TICKETSCODEChange(e){
   this.FuncCheck()
  }
  CheckTicketCode(){
    var postData = {
      TICKETS_CODE:this.model.TICKETS_CODE
    }
    this.ticketmanagerServices.findTicket(postData).subscribe(result => {
      if(result &&result.data.length){
        this.hasTicketsCode = true
      }else{
        this.hasTicketsCode = false
      }
    })
    
  }
  //保存数据
  SaveContent(){
    if(this.hasTicketsCode){
      this._state.notifyDataChanged('Toast.Action.Show', { content: "请检查票号", type: "error" });
      return;
    }
    /*判断部分限制状态*/
    if(typeof this.model.AIRLINE_NAME == 'undefined'){
      this._state.notifyDataChanged('Toast.Action.Show', { content: "请填写航空名称", type: "error" });
      return;
    }
    //AIRLINE_CODE
    if(typeof this.model.AIRLINE_CODE == 'undefined'){
      this._state.notifyDataChanged('Toast.Action.Show', { content: "请填写航空编号", type: "error" });
      return;
    }
    //TICKETS_CODE
    if(typeof this.model.TICKETS_CODE == 'undefined'){
      this._state.notifyDataChanged('Toast.Action.Show', { content: "请填写票号", type: "error" });
      return;
    }
    //PASSENGER
    if(typeof this.model.PASSENGER == 'undefined'){
      this._state.notifyDataChanged('Toast.Action.Show', { content: "请填写乘客名称", type: "error" });
      return;
    }
    //TICKETS_DATEObject
    if(typeof this.model.TICKETS_DATEObject == 'undefined'){
      this._state.notifyDataChanged('Toast.Action.Show', { content: "请选择出票日期", type: "error" });
      return;
    }
    //TOTALBILL
    if(typeof this.model.TOTALBILL == 'undefined'){
      this._state.notifyDataChanged('Toast.Action.Show', { content: "请填写总价", type: "error" });
      return;
    }
    //AIRBILL
    if(typeof this.model.AIRBILL == 'undefined'){
      this._state.notifyDataChanged('Toast.Action.Show', { content: "请填写航空结算费", type: "error" });
      return;
    }
    //SelDLNAME ||GR_DLNAME
    if(typeof this.model.SelDLNAME == 'undefined' && typeof this.model.GR_DLNAME == 'undefined'){
      this._state.notifyDataChanged('Toast.Action.Show', { content: "请填写代理名称", type: "error" });
      return;
    }
    //DLBILL
    if(typeof this.model.DLBILL == 'undefined'){
      this._state.notifyDataChanged('Toast.Action.Show', { content: "请填写代理结算价", type: "error" });
      return;
    }
    //ISVALID
    if(typeof this.model.ISVALID == 'undefined'){
      this._state.notifyDataChanged('Toast.Action.Show', { content: "请填写支付状态", type: "error" });
      return;
    }

    //判断销售对象选择
    if(this.model.DLTYPE == 10){
      this.model.DLNAME = this.model.GR_DLNAME
    }else{
      this.model.DLNAME = this.model.SelDLNAME
    }
    //判断支付状态
    if(this.model.ISVALID == 3){
      //部分支付
      //PAYMONEY
    }else if(this.model.ISVALID == 1){
      //全额付款
      this.model.PAYMONEY = this.model.TOTALBILL
    }else if(this.model.value == 2){
      this.model.PAYMONEY = 0
    }
    this.model.ISVALID = parseInt(this.model.ISVALID)
    this.model.DLTYPE = parseInt(this.model.DLTYPE)
    //日期
    this.model.TICKETS_DATE =  moment(this.model.TICKETS_DATEObject.year +"-"+ this.model.TICKETS_DATEObject.month + "-"+ this.model.TICKETS_DATEObject.day)
    console.log(this.model)
    if(this.model.TICKETS_ID){
      this.ticketmanagerServices.UpdateTicket(this.model).subscribe(result => {
        if (result != null) {
          this._state.notifyDataChanged('Toast.Action.Show', { content: "保存成功", type: "success" });
          Object.assign(this.model, result.data);
        }
      })
    }else{
      this.ticketmanagerServices.InsertTicket(this.model).subscribe(result => {
        if (result != null) {
          this._state.notifyDataChanged('Toast.Action.Show', { content: "保存成功", type: "success" });
        }
      })
    }
  }
  //代理下拉框修改
  DLTYPEChangeEvent(e){
    this.model.DLNAME = ""
    if(e.target.value == 10){
      this.setting.showDlSelect = false;
    }else{
      this.setting.showDlSelect = true;
      this.LoadTypeName(e.target.value)
    }
  }
  PayStateChangeEvent(e){
    console.log(e.target.value)
    if(e.target.value == "3"){
      this.setting.showPayState = true;
    }else{
      this.setting.showPayState = false;
    }
  }

  LoadTypeName(dltype){
    var self = this;
    this.loadingState = true;
    let getData = {
      DLTYPE: dltype
    }
    this.ticketmanagerServices.findDL(getData).subscribe(result => {
      this.loadingState = false;
      if (result != null) {
        self.DLNameArray = result.data
      }
    })
  }
}

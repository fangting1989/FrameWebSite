import { Component, OnInit,ViewChild } from '@angular/core';
import { moneymanagerServices } from '../../services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalState } from '../../../../global.state';
import {_} from 'underscore';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import * as moment from 'moment'
import { MoneylistComponent} from '../moneylist/moneylist.component'
import { CompareresultComponent} from '../compareresult/compareresult.component'
import { InputmoneyComponent} from '../inputmoney/inputmoney.component'
// 
@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent implements OnInit {
  DataList:any = []
  model_HK:any = {
    TYPESEL:"1",
    spancount:11
  }
  model_HK_T:any = {}
  model_DL:any = {
    TYPESEL:"1",
    spancount:7
  }
  model_DL_T:any = {}
  setting:any = {
    showDlSelect:false
  }
  DLNameArray:any = []
  loadingState:any = false
  DLloadingState:any = false
  PageNum: number = 1;
  PageSize: number = 10;
  RecordCount: number;
  DLRecordCount: number;
  DLDataList:any = []
  FileObject:any = null;
  AirLineArray:any = Object.assign([],WebConfig.AirLineArray)
  DLTypeArray:any = Object.assign([],WebConfig.AgentTypeArray)
  PAYSTATEArray:any = Object.assign([],WebConfig.PayStateArray)
  HKPayStateArray:any = Object.assign([],WebConfig.HKPayStateArray)
  CYCTIMEArray:any = Object.assign([],WebConfig.CycTimeArray)
  MONTHArray:any = [{value:"01",name:"1月"},{value:"02",name:"2月"},{value:"03",name:"3月"},{value:"04",name:"4月"},
    {value:"05",name:"5月"},{value:"06",name:"6月"},{value:"07",name:"7月"},{value:"08",name:"8月"},
    {value:"09",name:"9月"},{value:"10",name:"10月"},{value:"11",name:"11月"},{value:"12",name:"12月"}]
  YEARArray:any =[{value:"2017",name:"2017"},{value:"2018",name:"2018"},{value:"2019",name:"2019"},{value:"2020",name:"2020"},{value:"2021",name:"2021"},{value:"2022",name:"2022"},{value:"2023",name:"2023"}]

  constructor(private _state: GlobalState,
    private moneymanagerServices:moneymanagerServices,
    private modalService: NgbModal,) {
    
  }

  ngOnInit() {
    if(_.findIndex( this.AirLineArray,{name:"全部"}) == -1){
      this.AirLineArray.unshift({value:"0",name:"全部"})
    }
    if(_.findIndex( this.PAYSTATEArray,{name:"全部"}) == -1){
      this.PAYSTATEArray.unshift({value:"0",name:"全部"})
    }
    if(_.findIndex( this.HKPayStateArray,{name:"全部"}) == -1){
      this.HKPayStateArray.unshift({value:"0",name:"全部"})
    }
    if(_.findIndex( this.DLTypeArray,{name:"全部"}) == -1){
      this.DLTypeArray.unshift({value:"0",name:"全部"})
    }
    this.Init();
    //默认查询数据
    var dataarray = moment().format("YYYY-MM-DD").split('-')
    this.model_HK.STARTYEAR = dataarray[0]
    this.model_HK.STARTMONTH = dataarray[1]
    this.model_HK.ENDYEAR = dataarray[0]
    this.model_HK.ENDMONTH = dataarray[1]
    this.model_DL.STARTYEAR = dataarray[0]
    this.model_DL.STARTMONTH = dataarray[1]
    this.model_DL.ENDYEAR = dataarray[0]
    this.model_DL.ENDMONTH = dataarray[1]
    var day = parseInt(dataarray[2])
    if (day > 0 && day <=7){
      this.model_HK.STARTCYC =1
      this.model_HK.ENDCYC = 1
      this.model_DL.STARTCYC =1
      this.model_DL.ENDCYC = 1
    }else if (day > 7 && day <=15){
      this.model_HK.STARTCYC = 2
      this.model_HK.ENDCYC = 2
      this.model_DL.STARTCYC =2
      this.model_DL.ENDCYC = 2
    }else if (day > 15 && day <=23){
      this.model_HK.STARTCYC = 3
      this.model_HK.ENDCYC = 3
      this.model_DL.STARTCYC =3
      this.model_DL.ENDCYC = 3
    }else if (day > 23 && day <=31){
      this.model_HK.STARTCYC = 4
      this.model_HK.ENDCYC = 4
      this.model_DL.STARTCYC =4
      this.model_DL.ENDCYC = 4
    }
    //加载数据
    this.HKSearchClick()

    this.DLSearchClick()
  }

  Init(){
    /*航空初始化*/
    if(!this.model_HK.AIRLINE_NAME){
      this.model_HK.AIRLINE_NAME = "全部"
    }
    if(!this.model_HK.PAYSTATE){
      this.model_HK.PAYSTATE = "0"
    }
    //初始化总计
    this.model_HK_T = {
      NUM_T:0,
      TOTALBILL_T:0,
      TAXBILL_T:0,
      TICKETBILL_T:0,
      BACKBILL_T:0,
      AGENTSBILL_T:0,
      AIRBILL_T:0,
      
    }
    /*代理初始化*/
    if(!this.model_DL.DLTYPE){
      this.model_DL.DLTYPE = 0
    }
    
    if(!this.model_DL.PAYSTATE){
      this.model_DL.PAYSTATE = "0"
    }
    
    if(_.findIndex(this.DLTypeArray,{value:10})  == -1){
      this.DLTypeArray.push({value:10,name:"个人"})
    }
    this.model_DL_T = {
      NUM_T:0,
      AGENTSBILL_T:0
    }
  }
  

  //------------------------航空公司-----------------------
  HKLoadData(){
    
  }

  /*下拉框内容变化*/
  TYPESELChange(e){
    this.model_HK.TYPESEL = e

  }

  /*点击查询*/
  HKSearchClick(){
    this.model_HK.spancount = 10
    if(this.model_HK.TYPESEL == 1){
      this.model_HK.spancount = 11
      //按周
      if(!(this.model_HK.STARTYEAR && this.model_HK.STARTMONTH && this.model_HK.STARTCYC
        && this.model_HK.ENDYEAR && this.model_HK.ENDMONTH && this.model_HK.ENDCYC)){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_HK.TYPESEL == 2){
      //按月
      if(!(this.model_HK.STARTYEAR && this.model_HK.STARTMONTH
        && this.model_HK.ENDYEAR && this.model_HK.ENDMONTH) ){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_HK.TYPESEL == 3){
      //按年
      if(!this.model_HK.STARTYEAR ||  !this.model_HK.ENDYEAR){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }
    //sousuo
    if(this.loadingState){
      return
    }
    var self = this;
    this.loadingState = true;
    let getData = {
      AIRLINE_NAME: this.model_HK.AIRLINE_NAME,
      Pagenum: this.PageNum,
      Pagesize: this.PageSize,
      STARTCYC:this.model_HK.STARTCYC,
      ENDCYC:this.model_HK.ENDCYC,
      STARTMONTH: this.model_HK.STARTMONTH,
      ENDMONTH: this.model_HK.ENDMONTH,
      STARTYEAR:this.model_HK.STARTYEAR,
      ENDYEAR:this.model_HK.ENDYEAR,
      TYPESEL:this.model_HK.TYPESEL,
      PAYSTATE:this.model_HK.PAYSTATE,
    }
    this.moneymanagerServices.findTicket(getData).subscribe(result => {
      this.loadingState = false;
      if (result != null) {
        this.DataList = result.data
        this.RecordCount = result.recordcount
        this.Init();
        _.each(result.data,function(item){
          self.model_HK_T.NUM_T += item.NUM;
          self.model_HK_T.TOTALBILL_T += item.TOTALBILL;
          self.model_HK_T.TAXBILL_T += item.TAXBILL;
          self.model_HK_T.TICKETBILL_T += item.TICKETBILL;
          self.model_HK_T.BACKBILL_T += item.BACKBILL;
          self.model_HK_T.AGENTSBILL_T += item.AGENTSBILL;
          self.model_HK_T.AIRBILL_T += item.AIRBILL;
          if(self.model_HK.TYPESEL == 1){
            item.newACCOUNTS_CODE = item.ACCOUNTS_CODE.split('-')[0].replace("20","")+"年"+item.ACCOUNTS_CODE.split('-')[1]+"月"+item.ACCOUNTS_CODE.split('-')[2]+"期"
          }else if(self.model_HK.TYPESEL == 2){
            item.newACCOUNTS_CODE = item.ACCOUNTS_CODE.split('-')[0].replace("20","")+"年"+item.ACCOUNTS_CODE.split('-')[1]+"月"
          }else {
            item.newACCOUNTS_CODE = item.ACCOUNTS_CODE.split('-')[0].replace("20","")+"年"
          }
        })
      }
    })
  }

  
  /*查看详情*/
  HKItemDetail(item){
    this.model_HK.spancount = 10
    if(this.model_HK.TYPESEL == 1){
      this.model_HK.spancount = 11
      //按周
      if(!(this.model_HK.STARTYEAR && this.model_HK.STARTMONTH && this.model_HK.STARTCYC
        && this.model_HK.ENDYEAR && this.model_HK.ENDMONTH && this.model_HK.ENDCYC)){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_HK.TYPESEL == 2){
      //按月
      if(!(this.model_HK.STARTYEAR && this.model_HK.STARTMONTH
        && this.model_HK.ENDYEAR && this.model_HK.ENDMONTH) ){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_HK.TYPESEL == 3){
      //按年
      if(!this.model_HK.STARTYEAR ||  !this.model_HK.ENDYEAR){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }
    //sousuo
    if(this.loadingState){
      return
    }
    var self = this;
    this.loadingState = true;
    let getData = {
      AIRLINE_NAME: this.model_HK.AIRLINE_NAME,
      Pagenum: this.PageNum,
      Pagesize: this.PageSize,
      STARTCYC:this.model_HK.STARTCYC,
      ENDCYC:this.model_HK.ENDCYC,
      STARTMONTH: this.model_HK.STARTMONTH,
      ENDMONTH: this.model_HK.ENDMONTH,
      STARTYEAR:this.model_HK.STARTYEAR,
      ENDYEAR:this.model_HK.ENDYEAR,
      TYPESEL:this.model_HK.TYPESEL,
      PAYSTATE:this.model_HK.PAYSTATE,
      SELDATE:item.ACCOUNTS_CODE,
      SELAIRLINE_NAME:item.AIRLINE_NAME
    }
    this.moneymanagerServices.findCycDetail(getData).subscribe(result => {
      this.loadingState = false;
      console.log(result)
      if (result != null) {
        //弹出框模式--显示明细
        const modalRef = this.modalService.open(MoneylistComponent, { backdrop: 'static', windowClass: 'modal-90p' });
        modalRef.componentInstance.modaHead = '清单明细';
        modalRef.componentInstance.data = result.data
        modalRef.componentInstance.datatype = 1
        modalRef.result.then((result) => {
          //回调函数
        })
      }
    })
    
  }

  /*下载内容*/
  HKDownLoad(item){
    this.model_HK.spancount = 10
    if(this.model_HK.TYPESEL == 1){
      this.model_HK.spancount = 11
      //按周
      if(!(this.model_HK.STARTYEAR && this.model_HK.STARTMONTH && this.model_HK.STARTCYC
        && this.model_HK.ENDYEAR && this.model_HK.ENDMONTH && this.model_HK.ENDCYC)){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_HK.TYPESEL == 2){
      //按月
      if(!(this.model_HK.STARTYEAR && this.model_HK.STARTMONTH
        && this.model_HK.ENDYEAR && this.model_HK.ENDMONTH) ){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_HK.TYPESEL == 3){
      //按年
      if(!this.model_HK.STARTYEAR ||  !this.model_HK.ENDYEAR){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }
    //sousuo
    if(this.loadingState){
      return
    }
    var self = this;
    this.loadingState = true;
    let getData = {
      AIRLINE_NAME: this.model_HK.AIRLINE_NAME,
      Pagenum: this.PageNum,
      Pagesize: this.PageSize,
      STARTCYC:this.model_HK.STARTCYC,
      ENDCYC:this.model_HK.ENDCYC,
      STARTMONTH: this.model_HK.STARTMONTH,
      ENDMONTH: this.model_HK.ENDMONTH,
      STARTYEAR:this.model_HK.STARTYEAR,
      ENDYEAR:this.model_HK.ENDYEAR,
      TYPESEL:this.model_HK.TYPESEL,
      PAYSTATE:this.model_HK.PAYSTATE,
      SELDATE:item.ACCOUNTS_CODE,
      SELAIRLINE_NAME:item.AIRLINE_NAME
    }
    this.moneymanagerServices.downloadCycDetail(getData).subscribe(result => {
      this.loadingState = false;
      console.log(result)
      if (result != null) {
      }
    })
  }
  //对比数据
  HKTicketCompare(e,item){
    if (e.target.files[0] == null) {
      this._state.notifyDataChanged('Toast.Action.Show', { content: "请选择文件!", type: "error" });
      return
    }
    this.FileObject = e.target.files[0];
    /*条件判断*/
    this.model_HK.spancount = 10
    if(this.model_HK.TYPESEL == 1){
      this.model_HK.spancount = 11
      //按周
      if(!(this.model_HK.STARTYEAR && this.model_HK.STARTMONTH && this.model_HK.STARTCYC
        && this.model_HK.ENDYEAR && this.model_HK.ENDMONTH && this.model_HK.ENDCYC)){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_HK.TYPESEL == 2){
      //按月
      if(!(this.model_HK.STARTYEAR && this.model_HK.STARTMONTH
        && this.model_HK.ENDYEAR && this.model_HK.ENDMONTH) ){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_HK.TYPESEL == 3){
      //按年
      if(!this.model_HK.STARTYEAR ||  !this.model_HK.ENDYEAR){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }
    //sousuo
    if(this.loadingState){
      return
    }
    var self = this;
    this.loadingState = true;
    swal({title: "数据上传对比中..",showConfirmButton: false })
    const formData = new FormData();
    formData.append('file', this.FileObject);
    formData.append('AIRLINE_NAME', this.model_HK.AIRLINE_NAME);
    formData.append('STARTCYC', this.model_HK.STARTCYC);
    formData.append('ENDCYC', this.model_HK.ENDCYC);
    formData.append('STARTMONTH', this.model_HK.STARTMONTH);
    formData.append('ENDMONTH',  this.model_HK.STARTMONTH);
    formData.append('STARTYEAR',this.model_HK.STARTYEAR);
    formData.append('ENDYEAR', this.model_HK.ENDYEAR);
    formData.append('TYPESEL', this.model_HK.TYPESEL);
    formData.append('PAYSTATE', this.model_HK.PAYSTATE);
    formData.append('SELDATE', item.ACCOUNTS_CODE);
    formData.append('SELAIRLINE_NAME', item.AIRLINE_NAME);
    this.moneymanagerServices.HKTicketCompare(formData).subscribe(result => {
      this.loadingState = false;
      swal.close();
      jQuery("#file_"+item.AIRLINE_NAME+"_"+item.ACCOUNTS_CODE).val('');
      console.log(jQuery("#file_"+item.AIRLINE_NAME+"_"+item.ACCOUNTS_CODE).length)
      if(result){
        this._state.notifyDataChanged('Toast.Action.Show', { content: "对比完成!", type: "success" });
        //this.loadLandList();
        //弹出框模式--显示明细
        const modalRef = this.modalService.open(CompareresultComponent, { backdrop: 'static', windowClass: 'modal-860' });
        modalRef.componentInstance.modaHead = '对比明细';
        modalRef.componentInstance.data = result.data
        modalRef.result.then((result) => {
          //回调函数
        })
      }
    })
    console.log(item)
  }
  //已结算
  HKTicketPay(item){
    console.log(item)
    var self = this;
    swal({
      text: "您确定已经结算?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '结算',
      cancelButtonText: '取消'
    }).then(function () {
        //sousuo
        if(self.loadingState){
          return
        }
        self.loadingState = true;
        let getData = {
          SELDATE:item.ACCOUNTS_CODE,
          SELAIRLINE_NAME:item.AIRLINE_NAME
        }
        self.moneymanagerServices.HKTicketPay(getData).subscribe(result => {
          self.loadingState = false;
          if (result != null) {
            self._state.notifyDataChanged('Toast.Action.Show', { content: "操作成功!", type: "success" });
            self.HKSearchClick()
          }
        })
    }, function (dismiss) {
      if (dismiss === 'cancel') {
      } else {
        throw dismiss;
      }
    })

    
  }
  //------------------------代理结算-----------------------
  //代理下拉框修改
  DLTYPEChangeEvent(e){
    this.model_DL.DLNAME = ""
    if(e.target.value == 10){
      this.setting.showDlSelect = false;
    }else{
      this.setting.showDlSelect = true;
      this.LoadTypeName(e.target.value)
    }
  }
  DLTYPESELChange(e){
    this.model_DL.TYPESEL = e
  }
  LoadTypeName(dltype){
    var self = this;
    this.DLloadingState = true;
    let getData = {
      DLTYPE: dltype
    }
    this.moneymanagerServices.findDL(getData).subscribe(result => {
      this.DLloadingState = false;
      if (result != null) {
        self.DLNameArray = result.data
      }
    })
  }
  /*查询*/
  DLSearchClick(){
    this.model_DL.spancount = 7
    if(this.model_DL.TYPESEL == 1){
      this.model_DL.spancount = 6
      //按周
      if(!(this.model_DL.STARTYEAR && this.model_DL.STARTMONTH && this.model_DL.STARTCYC
        && this.model_DL.ENDYEAR && this.model_DL.ENDMONTH && this.model_DL.ENDCYC)){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_DL.TYPESEL == 2){
      //按月
      if(!(this.model_DL.STARTYEAR && this.model_DL.STARTMONTH
        && this.model_DL.ENDYEAR && this.model_DL.ENDMONTH) ){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_DL.TYPESEL == 3){
      //按年
      if(!this.model_DL.STARTYEAR ||  !this.model_DL.ENDYEAR){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }
    //sousuo
    if(this.DLloadingState){
      return
    }
    var self = this;
    this.DLloadingState = true;
    var mDLNAME = ""
    if(this.model_DL.DLTYPE == 0){
      mDLNAME = null;
    }else if(this.model_DL.DLTYPE == 10){
      //个人
      mDLNAME = this.model_DL.GR_DLNAME;
    }else{
      mDLNAME = this.model_DL.SelDLNAME
    }
    let getData = {
      DLTYPE: this.model_DL.DLTYPE,
      DLNAME:mDLNAME,
      Pagenum: this.PageNum,
      Pagesize: this.PageSize,
      STARTCYC:this.model_DL.STARTCYC,
      ENDCYC:this.model_DL.ENDCYC,
      STARTMONTH: this.model_DL.STARTMONTH,
      ENDMONTH: this.model_DL.ENDMONTH,
      STARTYEAR:this.model_DL.STARTYEAR,
      ENDYEAR:this.model_DL.ENDYEAR,
      TYPESEL:this.model_DL.TYPESEL,
      PAYSTATE:this.model_DL.PAYSTATE,
    }
    this.moneymanagerServices.finddlCyc(getData).subscribe(result => {
      this.DLloadingState = false;
      if (result != null) {
        this.DLRecordCount = result.recordcount
        this.Init();
        //个人处理
        // var hasGR = false;
        // var geObject = {
        //   DLTYPE:10,
        //   ACCOUNTS_CODE:0,
        //   NUM:0,
        //   DLBILL:0
        // }
        _.each(result.data,function(item){
          //合并个人
          //不计算个人
          // if(item.DLTYPE != 10){
            self.model_DL_T.NUM_T += item.NUM;
            self.model_DL_T.AGENTSBILL_T += item.DLBILL;
          // }
          if(self.model_DL.TYPESEL == 1){
            item.newACCOUNTS_CODE = item.ACCOUNTS_CODE.split('-')[0].replace("20","")+"年"+item.ACCOUNTS_CODE.split('-')[1]+"月"+item.ACCOUNTS_CODE.split('-')[2]+"期"
          }else if(self.model_DL.TYPESEL == 2){
            item.newACCOUNTS_CODE = item.ACCOUNTS_CODE.split('-')[0].replace("20","")+"年"+item.ACCOUNTS_CODE.split('-')[1]+"月"
          }else {
            item.newACCOUNTS_CODE = item.ACCOUNTS_CODE.split('-')[0].replace("20","")+"年"
          }
        })
        //this.DLDataList = _.filter(result.data,function(item){ return item.DLTYPE != 10 })
        this.DLDataList = result.data
      }
    })
  }
  /*查看详情*/
  DLItemDetail(item){
    this.model_DL.spancount = 7
    if(this.model_DL.TYPESEL == 1){
      this.model_DL.spancount = 6
      //按周
      if(!(this.model_DL.STARTYEAR && this.model_DL.STARTMONTH && this.model_DL.STARTCYC
        && this.model_DL.ENDYEAR && this.model_DL.ENDMONTH && this.model_DL.ENDCYC)){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_DL.TYPESEL == 2){
      //按月
      if(!(this.model_DL.STARTYEAR && this.model_DL.STARTMONTH
        && this.model_DL.ENDYEAR && this.model_DL.ENDMONTH) ){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_DL.TYPESEL == 3){
      //按年
      if(!this.model_DL.STARTYEAR ||  !this.model_DL.ENDYEAR){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }
    //sousuo
    if(this.DLloadingState){
      return
    }
    var self = this;
    this.DLloadingState = true;
    var mDLNAME = ""
    if(this.model_DL.DLTYPE == 0){
      mDLNAME = null;
    }else if(this.model_DL.DLTYPE == 10){
      //个人
      mDLNAME = this.model_DL.GR_DLNAME;
    }else{
      mDLNAME = this.model_DL.SelDLNAME
    }
    let getData = {
      DLTYPE: this.model_DL.DLTYPE,
      DLNAME:mDLNAME,
      Pagenum: this.PageNum,
      Pagesize: this.PageSize,
      STARTCYC:this.model_DL.STARTCYC,
      ENDCYC:this.model_DL.ENDCYC,
      STARTMONTH: this.model_DL.STARTMONTH,
      ENDMONTH: this.model_DL.ENDMONTH,
      STARTYEAR:this.model_DL.STARTYEAR,
      ENDYEAR:this.model_DL.ENDYEAR,
      TYPESEL:this.model_DL.TYPESEL,
      PAYSTATE:this.model_DL.PAYSTATE,
      SELDATE:item.ACCOUNTS_CODE,
      SELDLTYPE:item.DLTYPE,
      SELDLNAME:item.DLNAME
    }
    this.moneymanagerServices.finddlCycDetail(getData).subscribe(result => {
      this.DLloadingState = false;
      if (result != null) {
        //弹出框模式--显示明细
        const modalRef = this.modalService.open(MoneylistComponent, { backdrop: 'static', windowClass: 'modal-90p' });
        modalRef.componentInstance.modaHead = '清单明细';
        modalRef.componentInstance.data = result.data
        modalRef.componentInstance.datatype = 2
        modalRef.result.then((result) => {
          //回调函数
        })
      }
    })
  }
  /*下载内容*/
  DLDownLoad(item){
    
    this.model_DL.spancount = 7
    if(this.model_DL.TYPESEL == 1){
      this.model_DL.spancount = 6
      //按周
      if(!(this.model_DL.STARTYEAR && this.model_DL.STARTMONTH && this.model_DL.STARTCYC
        && this.model_DL.ENDYEAR && this.model_DL.ENDMONTH && this.model_DL.ENDCYC)){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_DL.TYPESEL == 2){
      //按月
      if(!(this.model_DL.STARTYEAR && this.model_DL.STARTMONTH
        && this.model_DL.ENDYEAR && this.model_DL.ENDMONTH) ){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }else if(this.model_DL.TYPESEL == 3){
      //按年
      if(!this.model_DL.STARTYEAR ||  !this.model_DL.ENDYEAR){
          this._state.notifyDataChanged('Toast.Action.Show', { content: "请认真选择条件", type: "error" });
          return
      }
    }
    //sousuo
    if(this.loadingState){
      return
    }
    var self = this;
    this.loadingState = true;
    var mDLNAME = ""
    if(this.model_DL.DLTYPE == 0){
      mDLNAME = null;
    }else if(this.model_DL.DLTYPE == 10){
      //个人
      mDLNAME = this.model_DL.GR_DLNAME;
    }else{
      mDLNAME = this.model_DL.SelDLNAME
    }
    let getData = {
      DLTYPE: this.model_DL.DLTYPE,
      DLNAME:mDLNAME,
      Pagenum: this.PageNum,
      Pagesize: this.PageSize,
      STARTCYC:this.model_DL.STARTCYC,
      ENDCYC:this.model_DL.ENDCYC,
      STARTMONTH: this.model_DL.STARTMONTH,
      ENDMONTH: this.model_DL.ENDMONTH,
      STARTYEAR:this.model_DL.STARTYEAR,
      ENDYEAR:this.model_DL.ENDYEAR,
      TYPESEL:this.model_DL.TYPESEL,
      PAYSTATE:this.model_DL.PAYSTATE,
      SELDATE:item.ACCOUNTS_CODE,
      SELDLTYPE:item.DLTYPE,
      SELDLNAME:item.DLNAME
    }
    this.moneymanagerServices.downloaddlCycDetail(getData).subscribe(result => {
      this.loadingState = false;
      console.log(result)
      if (result != null) {
      }
    })
  }
  /*录入金额*/
  InputMoneyClick(item){
    var self = this;
    //弹出框模式--显示明细
    const modalRef = this.modalService.open(InputmoneyComponent, { backdrop: 'static', windowClass: 'modal-500' });
    modalRef.componentInstance.modaHead = '录入金额';
    modalRef.componentInstance.data = item
    modalRef.result.then((result) => {
      //回调函数
      self.DLSearchClick();
    })
  }
}

import { Component, OnInit,ViewChild } from '@angular/core';
import { ticketmanagerServices } from '../../services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalState } from '../../../../global.state';
import { TicketeditComponent } from '../ticketedit/ticketedit.component';
import {_} from 'underscore';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import * as moment from 'moment'

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  constructor( 
    private ticketmanagerServices: ticketmanagerServices,
    private modalService: NgbModal,
    private _state: GlobalState,
    private router: Router
  ) {
    this._state.notifyDataChanged('app.nav', { level: 1, NavName: "机票管理", routerLink: "ticket/ticket" });
    this.changeHeight = window.innerHeight - 90;
  }
  changeHeight: any;
  DataList: any = [];
  model:any = {
    toggle:false
  }
  PageNum: number = 1;
  PageSize: number = 10;
  RecordCount: number;
  loadingState: boolean;
  DLNameArray:any = []
  FileArray:any = [];
  FileObject:any = null;
  DYTYPEArray:any = [{code:1,name:'待售'},{code:2,name:'二级代理'},{code:3,name:'企业用户'}]
  AirLineArray:any = Object.assign([],WebConfig.AirLineArray) 
  @ViewChild('uploadFileLH') uploadFileLH: any
  @ViewChild('uploadFileEH') uploadFileEH: any
  @ViewChild('uploadFileQT') uploadFileQT: any
  ngOnInit() {
    console.log(this.AirLineArray)
    var self = this;
    window.onresize = function () {
      self.changeHeight = window.innerHeight - 90;
    }
    this.loadDLList();
    this.loadLandList();
  }
  //地块列表
  loadLandList() {
    var self = this;
    this.loadingState = true;
    let getData = {
      NAME: this.model.name,
      Pagenum: this.PageNum,
      Pagesize: this.PageSize,
      START: this.model.STARTDATEObject? moment(this.model.STARTDATEObject.year +"-"+ this.model.STARTDATEObject.month + "-"+ this.model.STARTDATEObject.day).format("YYYY-MM-DD"):null,
      END: this.model.ENDDATEObject? moment(this.model.ENDDATEObject.year +"-"+ this.model.ENDDATEObject.month + "-"+ this.model.ENDDATEObject.day).format("YYYY-MM-DD"):null,
      AIRLINE_NAME:this.model.AIRLINE_NAME,
      DL_NAME:this.model.DL_NAME
    }
    this.ticketmanagerServices.findTicket(getData).subscribe(result => {
      this.loadingState = false;
      if (result != null) {
        this.DataList = result.data
        this.RecordCount = result.recordcount
      }
    })
  }

  loadDLList(){
    var self = this;
    this.loadingState = true;
    let getData = {
    }
    this.ticketmanagerServices.findDL(getData).subscribe(result => {
      this.loadingState = false;
      if (result != null) {
        self.DLNameArray = result.data
      }
    })
  }
  //搜索输入事件
  keyup(e) {
    if (e.keyCode == 13) {
      this.loadLandList();
    }
  }
  //搜索按钮
  selectClick() {
    this.loadLandList();
  }
  //翻页
  pageChange() {
    this.DataList = [];
    this.loadLandList();
  }

  
  //跳转
  AddTicket(){
    this.router.navigateByUrl('/pages/ticket/ticketedit')
  }

  // FileUpladClick(){
  //   const formData = new FormData();
  //   formData.append('file', this.FileObject);
  //   this.landService.UploadFile(formData).subscribe(result => {
  //     console.log(result)
  //   })
  // }

  EditInfo(item){
    this.router.navigate(['pages', 'ticket', 'ticketedit'],{queryParams:{code:item.TICKETS_ID}});
  }

  // getUpload(e){
  //   if (e.target.files[0]) {
  //     this.FileObject = e.target.files[0];
  //    }
  // }
  Del(item){
    var self = this;
    swal({
      title: '您确定要删除吗?',
      text: "删除后您将无法恢复此操作!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '删除',
      cancelButtonText: '取消'
    }).then(function () {
      var DelData = {
        TICKETS_ID: item.TICKETS_ID
      }
      self.ticketmanagerServices.DelTicket(DelData).subscribe(result => {
        if (result.errid > 0) {
          swal('删除成功!')
          self.loadLandList();
        } else {
          swal(
            '删除失败!'
          )
        }
      })
    }, function (dismiss) {
      if (dismiss === 'cancel') {
      } else {
        throw dismiss;
      }
    })
  }

  //上传文件
  getUpload(e,type){
    if (e.target.files[0]) {
      this.FileObject = e.target.files[0];
      this.FileUpladClick(type)
     }
  }

  FileUpladClick(type){
    swal({title: "数据上传中..",showConfirmButton: false })
    const formData = new FormData();
    formData.append('file', this.FileObject);
    formData.append('filetype', type);
    this.ticketmanagerServices.UploadFile(formData).subscribe(result => {
      swal.close();
      this.uploadFileLH.nativeElement.value = ''
      this.uploadFileEH.nativeElement.value = ''
      this.uploadFileQT.nativeElement.value = ''
      if(result){
        this._state.notifyDataChanged('Toast.Action.Show', { content: "上传成功!", type: "success" });
        this.loadLandList();
      }
    })
  }

  AIRLINESel(e){
    this.loadLandList();
  }

  DLNAMESel(e){
    this.loadLandList();
  }

  TimeChange(e){
    this.loadLandList();
  }
  ClearCondition(){
    var toggle = this.model.toggle
    this.model = {
      toggle:toggle
    }
  }

}

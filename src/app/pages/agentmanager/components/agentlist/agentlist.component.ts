import { Component, OnInit } from '@angular/core';
import { agentmanagerServices } from '../../services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalState } from '../../../../global.state';
import { AgenteditComponent } from '../agentedit/agentedit.component';
import {_} from 'underscore';
import swal from 'sweetalert2'
@Component({
  selector: 'app-agentlist',
  templateUrl: './agentlist.component.html',
  styleUrls: ['./agentlist.component.scss']
})
export class AgentlistComponent implements OnInit {
  constructor(
    private landService: agentmanagerServices,
    private modalService: NgbModal,
    private _state: GlobalState,
  ) {
    this._state.notifyDataChanged('app.nav', { level: 1, NavName: "代理管理", routerLink: "agent/agentlist" });
    this.changeHeight = window.innerHeight - 90;
  }
  changeHeight: any;
  landListData: any = [];
  PageNum: number = 1;
  PageSize: number = 10;
  RecordCount: number;
  loadingState: boolean;
  landName: string;
  FileArray:any = [];
  FileObject:any = null;
  DYTYPEArray:any =  WebConfig.AgentTypeArray

  ngOnInit() {
    this.InitUpload();
    var self = this;
    window.onresize = function () {
      self.changeHeight = window.innerHeight - 90;
    }
    this.loadLandList();
  }
  InitUpload(){
    
  }
  //地块列表
  loadLandList() {
    var self = this;
    this.loadingState = true;
    let getData = {
      DL_NAME: this.landName,
      Pagenum: this.PageNum,
      Pagesize: this.PageSize
    }
    this.landService.findAgent(getData).subscribe(result => {
      this.loadingState = false;
      if (result != null) {
        _.each(result.data,function(dt){
          _.each(self.DYTYPEArray,function(DYItem){
              if(DYItem.value == dt.DLTYPE){
                dt.newDLTYPE = DYItem.name;
              }
          })
        })
        this.landListData = result.data
        this.RecordCount = result.recordcount
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
    this.landListData = [];
    this.loadLandList();
  }

  
  //增加会员
  AddMember(){
    const modalRef = this.modalService.open(AgenteditComponent, { backdrop: 'static', windowClass: 'modal-500' });
    modalRef.componentInstance.modaHead = '编辑信息';
    modalRef.componentInstance.data = ""
    modalRef.result.then((result) => {
      this.loadLandList();
    })
  }

  // FileUpladClick(){
  //   const formData = new FormData();
  //   formData.append('file', this.FileObject);
  //   this.landService.UploadFile(formData).subscribe(result => {
  //     console.log(result)
  //   })
  // }

  EditInfo(item){
    const modalRef = this.modalService.open(AgenteditComponent, { backdrop: 'static', windowClass: 'modal-500' });
    modalRef.componentInstance.modaHead = '编辑信息';
    modalRef.componentInstance.data = item
    modalRef.result.then((result) => {
      this.loadLandList();
    })
    
  }
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
        DL_ID: item.DL_ID
      }
      self.landService.AgentDel(DelData).subscribe(result => {
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
  // getUpload(e){
  //   if (e.target.files[0]) {
  //     this.FileObject = e.target.files[0];
  //    }
  // }
}

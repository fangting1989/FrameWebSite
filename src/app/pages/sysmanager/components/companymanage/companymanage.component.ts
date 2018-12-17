import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../../../../global.state';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { sysmanagerServices } from '../../services';
import { CompanyEditComponent } from '../company-edit/company-edit.component';

@Component({
  selector: 'app-companymanage',
  templateUrl: './companymanage.component.html',
  styleUrls: ['./companymanage.component.scss']
})
export class CompanymanageComponent implements OnInit {

  constructor(
    private _state: GlobalState,
    private sysService: sysmanagerServices,
    private modalService: NgbModal
  ) {
    this._state.notifyDataChanged('app.nav', { level: 1, NavName: "公司维护", routerLink: "./sysmanager/companymanage" });
    this.changeHeight = window.innerHeight - 90;
  }
  changeHeight: number;
  companyListData: any = [];
  PageNum: number = 1;
  PageSize: number = 10;
  RecordCount: number;
  loadingState: boolean = false;
  name: string;
  ngOnInit() {
    var self = this;
    window.onresize = function () {
      self.changeHeight = window.innerHeight - 90;
    }
    this.loadList();
  }
  //公司列表
  loadList() {
    this.loadingState = true;
    let getData = {
      name: this.name,
      Pagenum: this.PageNum,
      Pagesize: this.PageSize
    }
    this.sysService.companyList(getData).subscribe(result => {
      if (result != null) {
        // console.log(result.data)
        this.companyListData = result.data;
        this.RecordCount = result.recordcount;
        this.loadingState = false;
      }
    })
  }
  //搜索输入事件
  keyup(e) {
    if (e.keyCode == 13) {
      this.loadList();
    }
  }
  //搜索按钮
  selectClick() {
    this.loadList();
  }
  //编辑
  EditInfo(data) {
    const modalRef = this.modalService.open(CompanyEditComponent, { backdrop: 'static', windowClass: 'modal-860' });
    modalRef.componentInstance.modaHead = '编辑信息';
    modalRef.componentInstance.data = data.ENTERPRISE_ID;
    modalRef.result.then((result) => {
      this.loadList();
    })
  }
  //翻页
  pageChange() {
    this.companyListData = [];
    this.loadList();
  }
}

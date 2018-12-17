import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { sysmanagerServices } from '../../services';
import { GlobalState } from '../../../../global.state';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  constructor(
    private sysService: sysmanagerServices,
    private activeModal: NgbActiveModal,
    private _state: GlobalState,
  ) { }
  @Input() data: any;
  companyData: any = {};
  modaHead:any = ""
  ngOnInit() {

    this.sysService.getCompanyDetail({ id: this.data }).subscribe(result => {
      if (result != null) {
        console.log(result.data)
        this.companyData = result.data;
        switch (this.companyData.ZT) {
          case 1:
            this.companyData.ZT = '确定';
            break;
          case 0:
            this.companyData.ZT = '不确定';
            break;
        }
      }
    })
  }
  //保存
  save() {
    switch (this.companyData.ZT) {
      case '确定':
        this.companyData.ZT = 1;
        break;
      case '确定':
        this.companyData.ZT = 0;
        break;
    }
    this.sysService.upCompanyData(this.companyData).subscribe(result => {
      if (result != null) {
        this.alert("修改成功", "success");
        this.activeModal.close();
      }
    })
  }
  //关闭modal
  CloseModal() {
    this.activeModal.close();
  }
  //提示信息
  alert(info, type) {
    this._state.notifyDataChanged('Toast.Action.Show', { content: info, type: type });
  }
}

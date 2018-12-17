import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalState } from '../../../../global.state';
import { moneymanagerServices } from '../../services';
import * as moment from 'moment';

@Component({
  selector: 'app-inputmoney',
  templateUrl: './inputmoney.component.html',
  styleUrls: ['./inputmoney.component.scss']
})
export class InputmoneyComponent implements OnInit {

  constructor(
    private moneymanagerServices: moneymanagerServices,
    private activeModal: NgbActiveModal,
    private _state: GlobalState,
  ) { }

  @Input() data: any;
  @Input() modaHead: any;
  model:any ={}
  ngOnInit() {
    this.model = Object.assign({},this.data)
  }

  save(){
    if(!this.model.NEWDLINPUTMONEY && (this.model.NEWDLINPUTMONEY+"") != "0"){
      this._state.notifyDataChanged('Toast.Action.Show', { content: "请填写内容", type: "error" });
      return
    }
    var postData = {
      SELDATE:this.model.ACCOUNTS_CODE,
      SELDLNAME:this.model.DLNAME,
      DLINPUTMONEY:this.model.DLINPUTMONEY,
      NEWDLINPUTMONEY:this.model.NEWDLINPUTMONEY,
      ISVALID:(this.model.NEWDLINPUTMONEY >= this.model.DLBILL)?1:3 
    }
    this.moneymanagerServices.dlinputmoney(postData).subscribe(result => {
      if (result != null) {
        this._state.notifyDataChanged('Toast.Action.Show', { content: "保存成功", type: "success" });
        this.CloseModal()
      }
    })

  }

  //关闭
  CloseModal() {
    this.activeModal.close();
  }

}

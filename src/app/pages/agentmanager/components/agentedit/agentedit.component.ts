import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalState } from '../../../../global.state';
import { agentmanagerServices } from '../../services';
import * as moment from 'moment';


@Component({
  selector: 'app-agentedit',
  templateUrl: './agentedit.component.html',
  styleUrls: ['./agentedit.component.scss']
})
export class AgenteditComponent implements OnInit {

  constructor(
    private agentmanagerServices: agentmanagerServices,
    private activeModal: NgbActiveModal,
    private _state: GlobalState,
  ) { }
  @Input() data: any;
  model: any = {
    DLTYPE:-1
  };
  modaHead:any = ""
  DLTypeArray:any = WebConfig.AgentTypeArray
  ngOnInit() {
    if(this.data.constructor == Object){
      this.model = this.data;
    }
  }
  //保存
  save() {
    if(this.model.DLTYPE != null){
      try{
        this.model.DLTYPE = parseInt(this.model.DLTYPE);
      }catch(e){
        this.model.DLTYPE = -1
      }
    }
    if(this.model.DL_ID){
      this.agentmanagerServices.AgentUpdate(this.model).subscribe(result => {
        if (result != null) {
          this._state.notifyDataChanged('Toast.Action.Show', { content: "保存成功", type: "success" });
          this.CloseModal()
        }
      })
    }else{
      this.agentmanagerServices.AgentInsert(this.model).subscribe(result => {
        if (result != null) {
          this._state.notifyDataChanged('Toast.Action.Show', { content: "保存成功", type: "success" });
          this.CloseModal()
        }
      })
    }
      
  }
  //关闭
  CloseModal() {
    this.activeModal.close();
  }
}
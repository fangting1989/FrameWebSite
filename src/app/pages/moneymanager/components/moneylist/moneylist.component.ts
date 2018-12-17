import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalState } from '../../../../global.state';
import * as moment from 'moment';

@Component({
  selector: 'app-moneylist',
  templateUrl: './moneylist.component.html',
  styleUrls: ['./moneylist.component.scss']
})
export class MoneylistComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private _state: GlobalState,
  ) { }
  @Input() data: any;
  @Input() datatype: any;
  modaHead:any = ""
  DataList: any = [];
  RecordCount:any = 0
  PageSize:any = 10;
  PageNum:any = 1;
  loadingState:any = false;
  DLTypeArray:any = WebConfig.AgentTypeArray
  ngOnInit() {
    this.DataList = this.data;
  }
  //关闭
  CloseModal() {
    this.activeModal.close();
  }

}

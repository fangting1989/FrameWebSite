import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalState } from '../../../../global.state';
import {_} from 'underscore'
import { TableExport} from 'tableexport'
import {saveAs as importedSaveAs} from "file-saver";
@Component({
  selector: 'app-compareresult',
  templateUrl: './compareresult.component.html',
  styleUrls: ['./compareresult.component.scss']
})
export class CompareresultComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private _state: GlobalState,
  ) { }
  @Input() data: any;
  DataList: any = [];
  modaHead:any = ""
  RecordCount:any = 0
  loadingState:any = false;
  PageSize:any = 10;
  PageNum:any = 1;
  DLTypeArray:any = WebConfig.AgentTypeArray
  ngOnInit() {
    this.DataList = _.sortBy(this.data, 'ERRCODE');
  }
  //关闭
  CloseModal() {
    this.activeModal.close();
  }
  ExportExcel(){
    document.getElementsByTagName("table")
    //导出excel
    new TableExport(document.getElementById("compare_teble_result"),{
      headers: true,
      footers: true,
      formats: ['xlsx','txt'],
      filename: '导出文件',
      bootstrap: true,
      exportButtons: true,
      position: 'top',
      ignoreRows: null,
      ignoreCols: null,
      trimWhitespace: true
  });
  }

}

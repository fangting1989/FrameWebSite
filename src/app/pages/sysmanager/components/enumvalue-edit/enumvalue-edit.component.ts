import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { sysmanagerServices } from '../../services';
import { GlobalState } from '../../../../global.state';
import { _ } from 'underscore';
import swal from 'sweetalert2';

@Component({
  selector: 'app-enumvalue-edit',
  templateUrl: './enumvalue-edit.component.html',
  styleUrls: ['./enumvalue-edit.component.scss']
})

export class EnumvalueEditComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private sysService: sysmanagerServices,
    private _state: GlobalState,
  ) { }
  @Input() data;
  changeHeight: any;
  enumValueNodes: any = [];
  enumValueBox: boolean = false;
  enumValueData: any = {};
  exampleData: any = [];
  okType: string;
  modaHead:any = ""
  TreeSetting: any;
  ngOnInit() {
    var self = this;
    // window.onresize = function () {
    //   self.changeHeight = $('.modal-body').height();
    // }
    setTimeout(() => {
      this.changeHeight = $('.modal-body').height();
    }, 100);
    // this.loadEnumValueData();
    this.loadTree();
  }
  //加载枚举值数据
  loadEnumValueData() {
    var self = this;
    this.sysService.enumValueList({ ID: this.data.id }).subscribe(result => {
      if (result != null) {
        this.enumValueNodes = [];
        this.exampleData = [{ id: '', text: '默认类别' }];
        _.each(result.data, (item) => {
          this.enumValueNodes.push({ id: item.ENUM_ID, pId: item.PID, name: item.ENUM_NAME, isParent: true });
          // this.exampleData.push({ id: item.ENUM_ID, disabled: false, text: item.ENUM_NAME });
        });
        this.enumValueNodes = _.uniq(this.enumValueNodes, 'id');
        self.InitDataTree(self.TreeSetting, self.enumValueNodes);
        let selectTree = this.recursionData(this.enumValueNodes, '-1');
        _.each(selectTree, (item) => {
          if (item.lev == 0) {
            this.exampleData.push({ id: item.id, text: item.name });
          } else if (item.lev == 1) {
            this.exampleData.push({ id: item.id, text: '　' + item.name });
          } else if (item.lev == 2) {
            this.exampleData.push({ id: item.id, text: '　　' + item.name });
          }
        })
      }
    });
  }
  //树形图
  loadTree() {
    var self = this;
    //配置
    var setting = {
      view: {
        dblClickExpand: false,
        showLine: true
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        beforeClick: beforeClick
      }
    };
    self.TreeSetting = setting;
    function beforeClick(treeId, treeNode, clickFlag) {
      self.okType = 'EnumValueBj';
      self.loadEnumValueDetail(treeNode.id);
      self.enumValueBox = true;
    }
    this.loadEnumValueData();
  }
  //实例化树
  InitDataTree(setting, data) {
    $.fn.zTree.init($("#enumeValuetreeDemo"), setting, data);
  }
  //枚举值详情
  loadEnumValueDetail(e) {
    this.sysService.getEnumValueDetail({ ID: e }).subscribe(result => {
      console.log(result)
      if (result != null) {
        this.enumValueData = result.data;
      }
    });
  }
  //添加
  addClick() {
    this.okType = 'EnumValueTj';
    this.enumValueData = {};
    this.enumValueBox = true;

  }
  //下拉框事件
  changed(e) {
    this.enumValueData.PID = Number(e.value);
    // if (t == 'EnumItem') {
    //   this.enumItemData.EXPLAINTYPE_ID = e.value;
    //   console.log(this.enumItemData)
    // } else if (t == 'TypeItem') {
    //   this.typeItemData.PID = e.value;
    // }
  }
  //保存
  okClick(e) {
    var self = this;
    this.enumValueData.EXPLAIN_ID = this.data.id;
    if (e == 'EnumValueTj') {
      this.sysService.inEnumValue(this.enumValueData).subscribe(result => {
        console.log(result)
        if (result != null) {
          this.loadEnumValueData();
          this.alert("添加成功", "success");
          this.enumValueBox = false;
        }
      });
    } else {
      this.sysService.upEnumValueItem(this.enumValueData).subscribe(result => {
        if (result != null) {
          this.alert("修改成功", "success");
          this.loadEnumValueData();
          this.enumValueBox = false;
        }
      });
    }
  }

  //删除
  deleteClick() {
    var self = this;
    swal({
      title: '你确定要删除吗?',
      text: '删除后文件将无法恢复!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(function () {
      self.sysService.deEnumValueItem({ ENUM_ID: self.enumValueData.ENUM_ID }).subscribe(result => {
        if (result != null) {
          // self.alert("删除成功", "success");
          self.loadEnumValueData();
          self.enumValueBox = false;
          swal(
            '删除!',
            '你的文件已经被删除',
            'success'
          )
        }
      });
    }, function (dismiss) { });
  }
  //关闭modal
  CloseModal() {
    this.activeModal.close();
  }
  //递归数据处理
  recursionData(arr, id) {
    var temp = [], lev = 0;
    var forFn = function (arr, id, lev) {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item.pId == id) {
          item.lev = lev;
          temp.push(item);
          forFn(arr, item.id, lev + 1);
        }
      }
    };
    forFn(arr, id, lev);
    return temp;
  }
  //提示信息
  alert(info, type) {
    this._state.notifyDataChanged('Toast.Action.Show', { content: info, type: type });
  }
}
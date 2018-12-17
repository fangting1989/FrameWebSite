import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../../../../global.state';
import { sysmanagerServices } from '../../services';
import swal from 'sweetalert2';
import { _ } from 'underscore';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumvalueEditComponent } from '../enumvalue-edit/enumvalue-edit.component';


@Component({
  selector: 'app-enumeration',
  templateUrl: './enumeration.component.html',
  styleUrls: ['./enumeration.component.scss']
})
export class EnumerationComponent implements OnInit {
  constructor(
    private _state: GlobalState,
    private sysService: sysmanagerServices,
    private modalService: NgbModal
  ) {
    this._state.notifyDataChanged('app.nav', { level: 1, NavName: "枚举管理", routerLink: "./sysmanager/enumeration" });
    this.changeHeight = window.innerHeight - 90;
  }
  changeHeight: number;
  zNodes: any = [];
  typeItemData: any = {};
  enumItemData: any = {};
  typeItemBox: number = 0;
  exampleData: any = [];
  startValue: string;
  okType: string;
  TreeSetting: any;
  ngOnInit() {
    var self = this;
    window.onresize = function () {
      self.changeHeight = window.innerHeight - 90;
    }
    //下拉框默认值
    this.startValue = '';
    this.InitSettingTree()
  }
  //树形图
  InitSettingTree() {
    var self = this;
    var setting: any = {
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
        beforeClick: beforeClick,
        beforeExpand: beforeExpand,
        // onClick: onClick
      }
    };
    self.TreeSetting = setting;
    //单击节点
    function beforeClick(treeId, treeNode, clickFlag) {
      let typeId = treeNode.id.substring(0, treeNode.id.lastIndexOf('_'));
      if (typeId == 'EXPLAINTYPE') {
        // console.log('我是类别')
        self.okType = 'TypeItemBj';
        self.startValue = treeNode.pId;
        self.loadTypeDetail(self.ID(treeNode.id));
        self.typeItemBox = 1;
      } else if (typeId == 'EXPLAIN') {
        // console.log('我是枚举')
        self.okType = 'EnumItemBj';
        self.startValue = treeNode.pId;
        self.loadEnumDetail(self.ID(treeNode.id));
        self.typeItemBox = 2;
      }
      return (treeNode.click != false);
    };
    //展开/折叠父节点
    function beforeExpand(treeId, treeNode) {
      let typeId = treeNode.id.substring(0, treeNode.id.lastIndexOf('_'));
      if (typeId == 'EXPLAINTYPE') {
        self.loadEnumItem(treeNode);
      } else if (typeId == 'EXPLAIN') {
        // self.typeItemBox = 2;
      }
    }
    this.loadTypeList();
  }
  //实例化树
  InitDataTree(data, setting) {
    $.fn.zTree.init($("#treeDemo"), setting, data);
  }
  //类别列表
  loadTypeList() {
    var self = this;
    this.sysService.typeList({}).subscribe(result => {
      // console.log(result.data)
      if (result != null) {
        this.zNodes = [];
        this.exampleData = [];
        this.exampleData = [{ id: '', text: '默认类别' }];
        _.each(result.data, (item) => {
          if (item.EXPLAINTYPE_NAME != '') {
            item.EXPLAINTYPE_ID = 'EXPLAINTYPE_' + item.EXPLAINTYPE_ID;
            item.PID = 'EXPLAINTYPE_' + item.PID;
            this.zNodes.push({ id: item.EXPLAINTYPE_ID, pId: item.PID, name: item.EXPLAINTYPE_NAME, isParent: true });
            // this.exampleData.push({ id: item.EXPLAINTYPE_ID, disabled: false, text: item.EXPLAINTYPE_NAME })
            //, isParent: false  
          }
        });
        let selectTree = this.recursionData(this.zNodes, 'EXPLAINTYPE_0');
        _.each(selectTree, (item) => {
          if (item.lev == 0) {
            this.exampleData.push({ id: item.id, text: item.name });
          } else if (item.lev == 1) {
            this.exampleData.push({ id: item.id, text:'　'+item.name });
          } else if (item.lev == 2) {
            this.exampleData.push({ id: item.id, text: '　　' + item.name });
          }
        })
      }
      //绑定树
      self.InitDataTree(self.zNodes, self.TreeSetting);
    });
  }

  //加载枚举项
  loadEnumItem(e) {
    var self = this;
    let id = this.ID(e.id);
    this.sysService.ItemList({ ID: id }).subscribe(result => {
      if (result != null) {
        _.each(result.data, (item) => {
          item.EXPLAINTYPE_ID = 'EXPLAINTYPE_' + item.EXPLAINTYPE_ID;
          item.EXPLAIN_ID = 'EXPLAIN_' + item.EXPLAIN_ID;
          this.zNodes.push({ id: item.EXPLAIN_ID, pId: item.EXPLAINTYPE_ID, name: item.EXPLAIN_NAME, isParent: false });
        })
        this.zNodes = _.uniq(this.zNodes, 'id');
        //展开当前节点
        _.each(self.zNodes, function (obj) {
          if (obj.id == e.id) {
            obj.open = true;
          }else{
            obj.open = false;
          }
        })
        this.InitDataTree(self.zNodes, self.TreeSetting);
      }
    });
  }
  //类别详情
  loadTypeDetail(id) {
    this.sysService.getTypeDetail({ ID: id }).subscribe(result => {
      if (result != null) {
        this.typeItemData = result.data;
      }
    });
  }
  //枚举详情
  loadEnumDetail(id) {
    this.sysService.getEnumDetail({ ID: id }).subscribe(result => {
      if (result != null) {
        this.enumItemData = result.data;
      }
    });
  }

  //下拉框事件
  changed(e, t) {
    if (t == 'EnumItem') {
      this.enumItemData.EXPLAINTYPE_ID = e.value;
      console.log(this.enumItemData)
    } else if (t == 'TypeItem') {
      this.typeItemData.PID = e.value;
    }
  }
  //保存
  okClick(t) {
    if (t == 'EnumItemTj') {
      this.enumItemData.EXPLAINTYPE_ID = this.ID(this.enumItemData.EXPLAINTYPE_ID)
      this.sysService.inEnumItem(this.enumItemData).subscribe(result => {
        if (result != null) {
          this.loadTypeList();
          this.typeItemBox = 0;
          this.alert("添加成功", "success");
        }
      });
    } else if (t == 'EnumItemBj') {
      this.sysService.upEnumItem(this.enumItemData).subscribe(result => {
        if (result != null) {
          this.loadTypeList();
          this.typeItemBox = 0;
          this.alert("编辑成功", "success");
        }
      });
    } else if (t == 'TypeItemTj') {
      if (this.typeItemData.PID != undefined) {
        this.typeItemData.PID = this.ID(this.typeItemData.PID)
      }
      this.sysService.inTypeItem(this.typeItemData).subscribe(result => {
        if (result != null) {
          this.loadTypeList();
          this.typeItemBox = 0;
          this.alert("添加成功", "success");
        }
      });
    } else if (t == 'TypeItemBj') {
      this.sysService.upTypeItem(this.typeItemData).subscribe(result => {
        if (result != null) {
          this.loadTypeList();
          this.typeItemBox = 0;
          this.alert("编辑成功", "success");
        }
      });
    }
  }
  //添加类别/枚举 按钮
  addClick(n) {
    if (n != 1) {
      this.enumItemData = {};
      this.okType = 'EnumItemTj';
    } else {
      this.typeItemData = {};
      this.okType = 'TypeItemTj';
    }
    this.startValue = '';
    this.typeItemBox = n;
  }
  //删除类别
  deleteClick(type) {
    var self = this;
    if (type == 'typeDelete') {
      swal({
        title: '你确定要删除吗?',
        text: '删除后文件将无法恢复!',
        type: 'warning',
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(function () {
        let ID = {
          EXPLAINTYPE_ID: self.typeItemData.EXPLAINTYPE_ID
        }
        self.sysService.deTypeItem(ID).subscribe(result => {
          if (result != null) {
            self.loadTypeList();
            self.typeItemBox = 0;
            // this.alert("删除成功", "success");
            swal(
              '删除!',
              '你的文件已经被删除',
              'success'
            )
          }
        });
      }, function (dismiss) { });
    } else {
      swal({
        title: '你确定要删除吗?',
        text: '删除后文件将无法恢复!',
        type: 'warning',
        showCancelButton: true,
        allowOutsideClick: false,
        // backdrop: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(function () {
        let ID = {
          EXPLAIN_ID: self.enumItemData.EXPLAIN_ID
        }
        self.sysService.deEnumItem(ID).subscribe(result => {
          if (result != null) {
            self.loadTypeList();
            self.typeItemBox = 0;
            // self.alert("删除成功", "success");
            swal(
              '删除!',
              '你的文件已经被删除',
              'success'
            )
          }
        });
      }, function (dismiss) { });
    }
  }
  //取整数ID
  ID(d) {
    return Number(d.substring(d.lastIndexOf('_') + 1));
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
  //编辑
  editClick() {
    const modalRef = this.modalService.open(EnumvalueEditComponent, { backdrop: 'static', windowClass: 'modal-860' });
    modalRef.componentInstance.modaHead = '编辑枚举值';
    modalRef.componentInstance.data = { id: this.enumItemData.EXPLAIN_ID };
    modalRef.result.then((result) => { console.log(result) }
    )
  }
  //提示信息
  alert(info, type) {
    this._state.notifyDataChanged('Toast.Action.Show', { content: info, type: type });
  }

}

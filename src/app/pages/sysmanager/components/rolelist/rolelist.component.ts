import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../../../../global.state';
import { sysmanagerServices } from '../../services';
import { _ } from 'underscore';
import swal from 'sweetalert2';
@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.scss']
})
export class RolelistComponent implements OnInit {
  constructor(
    private _state: GlobalState,
    private sysService: sysmanagerServices
  ) {
    this._state.notifyDataChanged('app.nav', { level: 1, NavName: "角色管理", routerLink: "./sysmanager/rolelist" });
    this.changeHeight = window.innerHeight - 90;
  }
  changeHeight: number;
  TreeSetting: any;
  roleNodes: any = [];
  exampleData: any = [];
  typeItemData: any = {};
  roleItemData: any = {};
  typeItemBox: any = 0;
  okType: string;
  ngOnInit() {
    var self = this;
    window.onresize = function () {
      self.changeHeight = window.innerHeight - 90;
    }
    //加载树形图
    this.loadTree();
  }
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
        beforeClick: beforeClick.bind(this),
        beforeExpand: beforeExpand.bind(this),
      }
    };
    this.TreeSetting = setting;
    //单击节点
    function beforeClick(treeId, treeNode, clickFlag) {
      let typeId = treeNode.id.substring(0, treeNode.id.lastIndexOf('_'));
      if (typeId == 'ROLETYPE') {
        // console.log(treeNode)
        this.loadRoleTypeDetail(treeNode);
        this.typeItemBox = 1;
        this.okType = 'RoleTypeBj';
      } else {
        this.loadRoleDetail(treeNode);
        this.typeItemBox = 2;
        this.okType = 'RoleBj';
      }

    }
    //展开/折叠父节点
    function beforeExpand(treeId, treeNode, clickFlag) {
      let typeId = treeNode.id.substring(0, treeNode.id.lastIndexOf('_'));
      if (typeId == 'ROLETYPE') {
        this.loadUser(treeNode);
      }
    }
    this.loadRoleType();
  }
  //实例化树
  InitDataTree(setting, data) {
    $.fn.zTree.init($("#treeDemo"), setting, data);
  }
  //角色类别
  loadRoleType() {
    var self = this;
    this.sysService.findRoleType({}).subscribe(result => {
      if (result != null) {
        // console.log(result.data)
        this.roleNodes = [];
        this.exampleData = [{ id: '', text: '默认类别' }];
        _.each(result.data, (item) => {
          item.ROLETYPE_ID = 'ROLETYPE_' + item.ROLETYPE_ID;
          item.ROLETYPE_PID = 'ROLETYPE_' + item.ROLETYPE_PID;
          this.roleNodes.push({ id: item.ROLETYPE_ID, pId: item.ROLETYPE_PID, name: item.ROLETYPE_NAME, isParent: true });
        });
        this.roleNodes = _.uniq(this.roleNodes, 'id');
        self.InitDataTree(self.TreeSetting, self.roleNodes);
        let selectTree = this.recursionData(this.roleNodes, 'ROLETYPE_0');
        // console.log(selectTree)
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
  //角色类别详情
  loadRoleTypeDetail(e) {
    this.sysService.getRoleTypeDetail({ ID: this.ID(e.id) }).subscribe(result => {
      if (result != null) {
        this.typeItemData = result.data;
        console.log(this.typeItemData)
      }
    });
  }
  //角色列表
  loadUser(e) {
    var self = this;
    this.sysService.findRole({ ID: this.ID(e.id) }).subscribe(result => {
      console.log(result.data)
      if (result != null) {
        this.roleItemData = result.data;
        _.each(result.data, (item) => {
          item.Roleid = 'ROLE_' + item.Roleid;
          item.Roletypeid = 'ROLETYPE_' + item.Roletypeid;
          this.roleNodes.push({ id: item.Roleid, pId: item.Roletypeid, name: item.Rolename });
        });
        console.log(this.roleNodes)
        this.roleNodes = _.uniq(this.roleNodes, 'id');
        //展开当前节点
        _.each(this.roleNodes, function (obj) {
          if (obj.id == e.id) {
            obj.open = true;
          }
        })
        this.InitDataTree(self.TreeSetting, self.roleNodes);
      }
    });
  }
  //角色类别详情
  loadRoleDetail(e) {
    this.sysService.getRoleDetail({ ID: this.ID(e.id) }).subscribe(result => {
      if (result != null) {
        this.roleItemData = result.data;
        console.log(this.typeItemData)
      }
    });
  }
  //保存
  okClick(t) {
    var self = this;
    if (t == 'RoleTypeTj') {
      this.sysService.inRoleType(this.typeItemData).subscribe(result => {
        if (result != null) {
          this.alert("添加成功", "success");
          this.loadRoleType();
          this.typeItemBox = 0;
        }
      });
    } else if (t == 'RoleTypeBj') {
      this.sysService.upUserType(this.typeItemData).subscribe(result => {
        if (result != null) {
          this.alert("修改成功", "success");
          this.loadRoleType();
          this.typeItemBox = 0;

          // let index = _.each(this.typeNodes, (item, index) => {
          //   if (item.id == this.typeItemData.UserTypeID) {
          //     console.log(index)
          //   }
          // })

        }
      });
    } else if (t == 'RoleTj') {
      this.sysService.inRole(this.roleItemData).subscribe(result => {
        if (result != null) {
          this.alert("添加成功", "success");
          this.loadRoleType();
          this.typeItemBox = 0;
        }
      });
    } else if (t == 'RoleBj') {
      this.sysService.upRole(this.roleItemData).subscribe(result => {
        if (result != null) {
          this.alert("修改成功", "success");
          this.loadRoleType();
          this.typeItemBox = 0;
        }
      });
    }
  }
  //添加类别
  addClick(n) {
    if (n != 1) {
      this.roleItemData = {};
      this.roleItemData.State = 1;
      this.okType = 'RoleTj';
    } else {
      this.typeItemData = {};
      this.okType = 'RoleTypeTj';
    }
    this.typeItemBox = n;
  }
  //删除类别
  deleteClick(t) {
    var self = this;
    if (t == 'typeDelete') {
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
          ROLETYPE_ID: self.typeItemData.ROLETYPE_ID
        }
        self.sysService.deRoleType(ID).subscribe(result => {
          if (result != null) {
            self.loadRoleType();
            self.typeItemBox = 0;
            swal(
              '删除!',
              '你的文件已经被删除',
              'success'
            )
          }
        });
      }, function (dismiss) { });
    } else if (t == 'roleDelete') {
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
          Roleid: self.roleItemData.Roleid
        }
        self.sysService.deRole(ID).subscribe(result => {
          if (result != null) {
            self.loadRoleType();
            self.typeItemBox = 0;
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
  //下拉框事件
  changed(e, t) {
    let id = this.ID(e.value);
    if (t == 'TypeItem') {
      this.typeItemData.ROLETYPE_PID = id;
    } else if (t == 'RoleItem') {
      this.roleItemData.Roletypeid = id;
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
  //提示信息
  alert(info, type) {
    this._state.notifyDataChanged('Toast.Action.Show', { content: info, type: type });
  }
}

import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../../../../global.state';
import { sysmanagerServices } from '../../services';
import { _ } from 'underscore';
import swal from 'sweetalert2';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  constructor(
    private _state: GlobalState,
    private sysService: sysmanagerServices
  ) {
    this._state.notifyDataChanged('app.nav', { level: 1, NavName: "用户管理", routerLink: "./sysmanager/userlist" });
    this.changeHeight = window.innerHeight - 90;
  }
  changeHeight: number;
  typeNodes: any = [];
  typeItemBox: number = 0;
  typeItemData: any = {};
  userItemData: any = {};
  exampleData: any = [];
  TreeSetting: any;
  okType: string;

  ngOnInit() {
    var self = this;
    window.onresize = function () {
      self.changeHeight = window.innerHeight - 90;
    }
    //加载树形图
    this.loadTree();
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
        beforeClick: beforeClick.bind(this),
        beforeExpand: beforeExpand.bind(this),
      }
    };
    this.TreeSetting = setting;
    //单击节点
    function beforeClick(treeId, treeNode, clickFlag) {
      let typeId = treeNode.id.substring(0, treeNode.id.lastIndexOf('_'));
      if (typeId == 'USER') {
        console.log(treeNode)
        this.loadUserDetail(treeNode);
        this.typeItemBox = 2;
        this.okType = 'UserBj';
      } else {
        this.loadUserTypeDetail(treeNode);
        this.typeItemBox = 1;
        this.okType = 'UserTypeBj';
      }

    }
    //展开/折叠父节点
    function beforeExpand(treeId, treeNode, clickFlag) {
      let typeId = treeNode.id.substring(0, treeNode.id.lastIndexOf('_'));
      if (typeId == 'USERTYPE') {
        this.loadUser(treeNode);
      }
    }
    this.loadUserType();
  }
  //实例化树
  InitDataTree(setting, data) {
    $.fn.zTree.init($("#treeDemo"), setting, data);
  }
  //加载有户类别
  loadUserType() {
    var self = this;
    this.sysService.findUserType({}).subscribe(result => {
      if (result != null) {
        console.log(result.data)
        this.typeNodes = [];
        this.exampleData = [{ id: '', text: '默认类别' }];
        _.each(result.data, (item) => {
          item.UserTypeID = 'USERTYPE_' + item.UserTypeID;
          item.Pid = 'USERTYPE_' + item.Pid;
          this.typeNodes.push({ id: item.UserTypeID, pId: item.Pid, name: item.Typename, isParent: true });
        });
        this.typeNodes = _.uniq(this.typeNodes, 'id');
        self.InitDataTree(self.TreeSetting, self.typeNodes);
        let selectTree = this.recursionData(this.typeNodes, 'USERTYPE_0');
        console.log(selectTree)
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
  //用户类别详情
  loadUserTypeDetail(e) {
    this.sysService.getUserTypeDetail({ ID: this.ID(e.id) }).subscribe(result => {
      if (result != null) {
        this.typeItemData = result.data;
        console.log(this.typeItemData)
      }
    });
  }
  //加载用户列表
  loadUser(e) {
    var self = this;
    this.sysService.findUser({ ID: this.ID(e.id) }).subscribe(result => {
      if (result != null) {
        this.userItemData = result.data;
        console.log(this.userItemData)
        _.each(result.data, (item) => {
          item.Userid = 'USER_' + item.Userid;
          item.UserTypeID = 'USERTYPE_' + item.UserTypeID;
          this.typeNodes.push({ id: item.Userid, pId: item.UserTypeID, name: item.Username });
        });
        console.log(this.typeNodes)
        this.typeNodes = _.uniq(this.typeNodes, 'id');
        //展开当前节点
        _.each(this.typeNodes, function (obj) {
          if (obj.id == e.id) {
            obj.open = true;
          }
        })
        this.InitDataTree(self.TreeSetting, self.typeNodes);
      }
    });
  }
  //用户详情
  loadUserDetail(e) {
    this.sysService.getUserDetail({ ID: this.ID(e.id) }).subscribe(result => {
      if (result != null) {
        this.userItemData = result.data;
      }
    });
  }
  //保存
  okClick(t) {
    var self = this;
    if (t == 'UserTypeTj') {
      this.sysService.inUserType(this.typeItemData).subscribe(result => {
        if (result != null) {
          this.alert("添加成功", "success");
          this.loadUserType();
          this.typeItemBox = 0;
        }
      });
    } else if (t == 'UserTypeBj') {
      this.sysService.upUserType(this.typeItemData).subscribe(result => {
        if (result != null) {
          this.alert("修改成功", "success");
          this.loadUserType();
          this.typeItemBox = 0;

          // let index = _.each(this.typeNodes, (item, index) => {
          //   if (item.id == this.typeItemData.UserTypeID) {
          //     console.log(index)
          //   }
          // })

        }
      });
    } else if (t == 'UserTj') {
      this.sysService.inUser(this.userItemData).subscribe(result => {
        if (result != null) {
          this.alert("添加成功", "success");
          this.loadUserType();
          this.typeItemBox = 0;
        }
      });
    } else if (t == 'UserBj') {
      this.sysService.upUser(this.userItemData).subscribe(result => {
        if (result != null) {
          this.alert("修改成功", "success");
          this.loadUserType();
          this.typeItemBox = 0;
        }
      });
    }
  }
  //添加类别
  addClick(n) {
    if (n != 1) {
      this.userItemData = {};
      this.okType = 'UserTj';
    } else {
      this.typeItemData = {};
      this.okType = 'UserTypeTj';
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
          UserTypeID: self.typeItemData.UserTypeID
        }
        self.sysService.deUserType(ID).subscribe(result => {
          if (result != null) {
            self.loadUserType();
            self.typeItemBox = 0;
            swal(
              '删除!',
              '你的文件已经被删除',
              'success'
            )
          }
        });
      }, function (dismiss) { });
    } else if (t == 'userDelete') {
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
          Userid: self.userItemData.Userid
        }
        self.sysService.deUser(ID).subscribe(result => {
          if (result != null) {
            self.loadUserType();
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
      this.typeItemData.Pid = id;
    } else if (t == 'UserItem') {
      this.userItemData.UserTypeID = id;
      console.log(this.userItemData)
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

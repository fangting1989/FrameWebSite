import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { comServices } from '../../services'
import { GlobalState } from '../../../global.state';
import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  model: any = {};
  modalHeader:any = "修改密码"
  constructor(private activeModal: NgbActiveModal,
    private comServices: comServices,
    private _state: GlobalState,
    private lStorage: CoolLocalStorage) { }

  ngOnInit() {
    var objToken = this.lStorage.getObject(WebConfig.cookieKeyName)
    this.model = objToken;
    console.log(this.model);
  }

  OKClick() {
    console.log(this.model)
    var passData = {
      userid: this.model.userid,
      pwd: this.model.oldpassword
    }
    this.comServices.judgePassword(passData).subscribe(result => {
      console.log(result);
      if (result != null) {
        if (this.model.surepassword != this.model.newpassword) {
          this._state.notifyDataChanged('Toast.Action.Show', { content: '对不起,两次密码不一致!', type: 'error' });
          return
        }
        var PostData = {
          userid: this.model.userid,
          pwd: this.model.newpassword
        }
        this.comServices.updatePassword(PostData).subscribe(result => {
          if (result != null) {
            this._state.notifyDataChanged('Toast.Action.Show', { content: '密码修改成功', type: 'success' });
          }
        })
        this.activeModal.close();
      }
    })

  }
  CancelClick() {
    this.activeModal.close();
  }


}

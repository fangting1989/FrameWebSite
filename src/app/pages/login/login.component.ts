import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginServices } from './services'
import { CoolLocalStorage } from 'angular2-cool-storage';
import { GlobalState } from './../../global.state';
@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  model: any = {
    account: '',
    pwd: ""
  };
  constructor(private sysServices: loginServices, private localStorage: CoolLocalStorage,
    private router: Router, private _state: GlobalState) {
  }

  keyup(e) {
    if (e.keyCode == 13) {
      this.Login()
    }
  }
  Login() {
    if (typeof this.model.account == 'undefined' || typeof this.model.pwd == 'undefined') {
      this._state.notifyDataChanged('Toast.Action.Show', { content: '请填写用户名和密码', type: 'error' });
      return;
    }
    //登入
    var postData = {
      Username: this.model.account,
      Pwd: this.model.pwd
    }
    this.sysServices.login(postData).subscribe(result => {
      if (result != null) {
        if (result.data == "") {
          this._state.notifyDataChanged('Toast.Action.Show', { content: result.errmsg, type: 'error' });
        } else {
          var obj = {
            Username: this.model.account,
            userid: result.data.userid,
            usertype:result.data.UserTypeID
          }
          this.localStorage.setObject(WebConfig.cookieKeyName, obj);
          this.router.navigate(['/pages/agent']);
        }
      }
    })
  }
}

import {Component} from "@angular/core";
import {NavController, Alert} from 'ionic-angular';
import {loginService} from '../../shared/services/login';
declare var $:any;

@Component({
  templateUrl: (function(){
  	console.log(navigator.userAgent);
  	return 'build/web/pages/login.html';
  }()),
 providers:[loginService]
})
export class LoginPage {
	public template:any;
	public _userName:string;
	public _password:string;
        public msg:string;

  constructor(private navController: NavController,public loginService:loginService) {

  }
  login(){
    this.msg = this.loginService.login(this._userName,this._password);
    this.showModal();
  }
  showModal(){
  	let updateModel: any = $('#loginModel');
        updateModel.modal('show');
        console.log('hello');
  } 	
}

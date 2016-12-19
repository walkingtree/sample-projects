import {Component} from "@angular/core";
import {NavController, Alert} from 'ionic-angular';
import {loginService} from '../../shared/services/login';
declare var $:any;
@Component({
  templateUrl: (function(){
  	return 'build/mobile/pages/login.html'
  }()),
  providers:[loginService]
})
export class LoginPage {
	public template:any;
	public _userName:string;
	public _password:string;

  constructor(private navController: NavController, public loginService:loginService) {
  } 	
  login(){
    let msg: any = this.loginService.login(this._userName,this._password);
    let alert : any = Alert.create({
        title: 'Info',
        subTitle: msg,
        buttons: ['Ok']
    });
    this.navController.present(alert);
  } 	
}

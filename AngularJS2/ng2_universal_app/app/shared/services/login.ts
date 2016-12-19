import {Injectable} from "@angular/core";

@Injectable()
export class loginService {
  constructor() {
  }  
  login(userName, password) {	
	if(userName == 'wtc@walkingtree.in' && password=='wtc') {
		return 'Valid Credentail';

	} else {
		return 'Invalid Credentail';
	}
  }
}
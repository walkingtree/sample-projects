import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class EmployeeService {

  constructor(private  http: Http) {
      
  }

  getEmployeeData() {
      return this.http.get('assets/data/data.json')     
   }
}

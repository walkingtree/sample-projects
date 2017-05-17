import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../../service/employee.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public employees: any = [];
  public search : string = "";

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() { 
      this.getEmployeeData();

  }

  getEmployeeData(){
    this.employeeService.getEmployeeData()
            .subscribe(res => this.employees = res.json());

  }
}

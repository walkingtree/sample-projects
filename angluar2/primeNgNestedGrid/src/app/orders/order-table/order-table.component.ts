import { OrdersService } from './../orders.service';
import { Component, OnInit } from '@angular/core';
import {DataTable} from 'primeng/primeng';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {

  orders:any[];
  constructor(private orderSvc:OrdersService) { }

  ngOnInit() {
    
    this.orderSvc.getOrders().then( data => this.orders = data);
  }
  onWarning(order){
    debugger;
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTableComponent } from './order-table/order-table.component';
import { OrdersService } from './orders.service';
import { 
  PanelModule,
  ButtonModule,
  DataTableModule
 } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DataTableModule
  ],
  declarations: [OrderTableComponent],
  providers: [OrdersService],
  exports:[ 
    OrderTableComponent
  ]
})
export class OrdersModule { }

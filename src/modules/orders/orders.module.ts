import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AddOrderComponent } from './components/add-order/add-order.component';

import { OrderListComponent } from './components/orders-list/orders-list.component';
import { OrdersComponent } from './containers/orders.component';

@NgModule({
  declarations: [OrdersComponent, OrderListComponent, AddOrderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
})
export class OrdersModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/modules/home/container/home.component';
import { AddOrderComponent } from 'src/modules/orders/components/add-order/add-order.component';
import { OrdersComponent } from 'src/modules/orders/containers/orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/add', component: AddOrderComponent },
  { path: 'orders/add/:id', component: AddOrderComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

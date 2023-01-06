import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from '../../models/orders.model';
import { OrdersService } from '../../services/oredrs.service';

@Component({
  selector: 'gs-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders$!: Observable<Order[]>;
  submittted = false;

  constructor(private orderService: OrdersService) {
    this.orderService.loadOrders();
  }

  ngOnInit(): void {
    this.orders$ = this.orderService.getOrders();
  }

  onDelete(id: string) {
    if (confirm('Are you really want to delete order?')) {
      this.orderService.deleteOrder(id);
    }
  }
}

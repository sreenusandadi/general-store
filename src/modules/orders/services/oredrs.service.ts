import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoaderService } from 'src/core/services/loader.service';

import { Order } from '../models/orders.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private OrderData$ = new Subject<Order[]>();
  orders!: Order[];
  constructor(private http: HttpClient, private loader: LoaderService) {}

  loadOrders() {
    this.loader.show();
    this.http
      .get<{ message: string; orders: any[] }>(
        'http://localhost:3000/api/orders'
      )
      .pipe(
        map((response) => {
          return response.orders.map((order) => {
            return {
              title: order.title,
              description: order.description,
              id: order._id,
              imagePath: order.imagePath,
            };
          });
        })
      )
      .subscribe({
        next: (transforedData) => {
          this.loader.hide();
          this.orders = transforedData;
          this.OrderData$.next([...this.orders]);
        },
        error: (error) => {
          this.loader.hide();
          
          console.log(error);
        },
      });
  }

  getOrders() {
    return this.OrderData$.asObservable();
  }

  addOrder(title: string, description: string, image: File) {
    this.loader.show();
    const orderData = new FormData();
    orderData.append('title', title);
    orderData.append('description', description);
    orderData.append('image', image);
    this.http
      .post<{ message: string; order: any }>(
        'http://localhost:3000/api/orders',
        orderData
      )
      .subscribe({
        next: (response) => {
          this.loader.hide();
          // const order = {
          //   id: response.order.id,
          //   title: title,
          //   description: description,
          //   imagePath: response.order.imagePath,
          // };
          // this.orders.push(order);
          // this.OrderData$.next([...this.orders]);
        },
      });
  }

  getSelectedOrder(id: string) {
    return this.http.get<{
      message: string;
      order: {
        _id: string;
        title: string;
        description: string;
        imagePath: string;
      };
    }>('http://localhost:3000/api/orders/' + id);
  }

  updateOrder(
    id: string,
    title: string,
    discription: string,
    image: File | string
  ) {
    this.loader.show();
    let orderData: FormData | Order;
    if (typeof image === 'object') {
      orderData = new FormData();
      orderData.append('id', id);
      orderData.append('title', title);
      orderData.append('discription', discription);
      orderData.append('image', image, title);
    } else {
      orderData = {
        id: id,
        title: title,
        description: discription,
        imagePath: image,
      };
    }
    this.http
      .put<{ message: string }>(
        'http://localhost:3000/api/orders/' + id,
        orderData
      )
      .subscribe((response) => {
        this.loader.hide();
        if (response) {
          const updatedOrder = this.orders;
          const orderIndex = this.orders.findIndex((order) => order.id === id);
          const order = {
            id: id,
            title: title,
            description: discription,
            imagePath: '',
          };
          updatedOrder[orderIndex] = order;
          this.orders = updatedOrder;
          this.OrderData$.next([...this.orders]);
        }
      });
  }

  deleteOrder(id: string) {
    this.loader.show();
    this.http.delete('http://localhost:3000/api/orders/' + id).subscribe({
      next: () => {
        this.loader.hide();
        this.orders = this.orders.filter((order) => order.id != id);
        this.OrderData$.next([...this.orders]);
      },
    });
  }
}

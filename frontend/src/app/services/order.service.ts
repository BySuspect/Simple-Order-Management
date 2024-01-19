import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ORDERS_URL,
  ORDER_CREATE_URL,
  ORDER_NEW_FOR_CURRENT_USER_URL,
  ORDER_PAY_URL,
  ORDER_TRACK_URL,
} from '../shared/constants/urls';
import { Order } from '../shared/models/Order';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  create(order: Order) {
    const newOrder = this.http.post<Order>(ORDER_CREATE_URL, order);

    order.items.forEach((element) => {
      this.productService
        .dropStock(element.product, element.quantity)
        .subscribe((any) => {
          console.log(any);
        });
    });

    return newOrder;
  }

  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  pay(order: Order): Observable<string> {
    return this.http.post<string>(ORDER_PAY_URL, order);
  }

  trackOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(ORDER_TRACK_URL + id);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(ORDER_TRACK_URL + id);
  }

  getAllOrdersForCurrentUser(): Observable<Order[]> {
    return this.http.get<Order[]>(ORDERS_URL);
  }
}

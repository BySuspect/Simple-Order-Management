import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ORDERS_BY_USER,
  ORDERS_URL,
  ORDER_CANCEL_URL,
  ORDER_CREATE_URL,
  ORDER_DELETE_URL,
  ORDER_NEW_FOR_CURRENT_USER_URL,
  ORDER_PAY_URL,
  ORDER_TRACK_URL,
} from '../shared/constants/urls';
import { Order } from '../shared/models/Order';
import { Observable, tap } from 'rxjs';
import { ProductService } from './product.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private toastrService: ToastrService,
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

  trackOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(ORDER_TRACK_URL + id);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(ORDER_TRACK_URL + id);
  }

  getOrdersByUserId(id: string): Observable<Order[]> {
    return this.http.get<Order[]>(ORDERS_BY_USER + id).pipe(
      tap({
        error: (res) => {
          if (res.status == 400) {
            this.toastrService.error(res.error, 'Error!');
          } else if (res.status == 404) {
            this.toastrService.error(res.error, 'Error!');
          }
        },
      }),
    );
  }

  deleteOrderById(id: string): Observable<Order> {
    return this.http.delete<Order>(ORDER_DELETE_URL + id);
  }

  getAllOrdersForCurrentUser(): Observable<Order[]> {
    return this.http.get<Order[]>(ORDERS_URL);
  }

  cancelOrder(order: Order): any {
    return this.http.post(ORDER_CANCEL_URL, order);
  }
}

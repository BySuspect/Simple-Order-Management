import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
})
export class OrdersPageComponent {
  orders: Order[] = [];
  constructor(
    private toastrService: ToastrService,
    private orderService: OrderService
  ) {
    orderService.getAllOrdersForCurrentUser().subscribe((orders) => {
      this.orders = orders;
    });
  }
}

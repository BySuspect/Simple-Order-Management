import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
})
export class OrderItemComponent {
  @Input()
  order!: Order;

  isPayed: boolean = false;
  constructor(
    private router: Router,
    private orderService: OrderService,
  ) {}

  trackClick() {
    this.router.navigateByUrl('/track/' + this.order.id);
  }
  checkoutClick() {
    this.router.navigateByUrl('/payment/' + this.order.id);
  }

  cancelClick() {
    this.orderService.cancelOrder(this.order).subscribe((newOrder: Order) => {
      this.order = newOrder;
    });
  }
}

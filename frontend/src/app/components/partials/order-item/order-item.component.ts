import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
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
  constructor(private router: Router, private cartService: CartService) {}

  trackClick() {
    this.router.navigateByUrl('/track/' + this.order.id);
  }
  checkoutClick() {
    this.router.navigateByUrl('/checkout');
  }
}

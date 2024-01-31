import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
})
export class OrderItemComponent {
  @Input()
  order!: Order;

  localUser!: User;

  isPayed: boolean = false;
  constructor(
    private router: Router,
    private orderService: OrderService,
    private toastrService: ToastrService,
    userService: UserService,
  ) {
    this.localUser = userService.currentUser;
  }

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

  deleteOrderClick() {
    this.orderService.deleteOrderById(this.order.id).subscribe((res) => {
      this.toastrService.success('Order deleted successfully!', 'Success!');
    });
  }
}

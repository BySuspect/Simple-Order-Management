import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
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
    private orderService: OrderService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['user']) {
        this.userService.checkIsAdmin().subscribe((res) => {
          if (!res) {
            this.toastrService.error(
              'You must be an admin to access this page!',
              'Error!',
            );
            this.router.navigateByUrl('/orders');
          } else {
            orderService
              .getOrdersByUserId(params['user'])
              .subscribe((orders) => {
                this.orders = orders;
              });
          }
        });
      } else {
        orderService.getAllOrdersForCurrentUser().subscribe((orders) => {
          this.orders = orders;
        });
      }
    });
  }
}

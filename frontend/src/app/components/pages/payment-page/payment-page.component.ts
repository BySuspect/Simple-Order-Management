import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
})
export class PaymentPageComponent implements OnInit {
  order: Order = new Order();
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        orderService
          .getOrderById(params.id)
          .pipe(
            catchError((error) => {
              this.toastrService.error(error['error'], 'Error');
              return throwError(error.error);
            })
          )
          .subscribe((serverOrder) => {
            this.order = serverOrder;
          });
      } else {
        orderService.getNewOrderForCurrentUser().subscribe({
          next: (order) => {
            this.order = order;
          },
          error: () => {
            this.toastrService.error('order is empty!', 'Error');
            router.navigateByUrl('/checkout');
          },
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.order.items.length == 0) {
      console.log('order empty');
      this.toastrService.error('order is empty!', 'Error');
      this.router.navigateByUrl('/');
    }
  }

  submit() {
    this.orderService.pay(this.order).subscribe({
      next: (orderId) => {
        this.cartService.clearCart();
        this.router.navigateByUrl('/track/' + orderId);
        this.toastrService.success('Payment Saved Successfully', 'Success');
      },
      error: (error) => {
        this.toastrService.error('Payment Save Failed', 'Error');
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css'],
})
export class OrderTrackPageComponent implements OnInit {
  order!: Order;
  constructor(
    activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router,
  ) {
    const params = activatedRoute.snapshot.params;
    if (!params.orderId) return;

    orderService
      .trackOrderById(params.orderId)
      .pipe(
        catchError((error) => {
          this.toastrService.error(error['error'], 'Error');
          this.router.navigateByUrl('/');
          return throwError(error.error);
        }),
      )
      .subscribe((order) => {
        this.order = order;
      });
  }
  checkoutClick() {
    this.router.navigateByUrl('/payment/' + this.order.id);
  }

  ngOnInit(): void {}
}

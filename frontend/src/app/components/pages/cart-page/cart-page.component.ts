import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  cart!: Cart;
  private hasStock: boolean = true;
  constructor(
    private cartService: CartService,
    private toastrService: ToastrService,
    private router: Router,
    private productService: ProductService
  ) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.product.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.product.id, quantity);
  }

  checkout(): void {
    const requests = this.cart.items.map((cartItem) =>
      this.productService.getProductById(cartItem.product.id)
    );

    forkJoin(requests)
      .pipe(
        catchError((error) => {
          this.toastrService.error(error['error'], 'Error');
          return throwError(error.error);
        })
      )
      .subscribe((serverProducts) => {
        let hasStock = true;
        serverProducts.forEach((serverProduct, index) => {
          const cartItem = this.cart.items[index];
          if (serverProduct.stock < cartItem.quantity) {
            this.toastrService.error(
              'Not enough stock for ' + serverProduct.name,
              'Error'
            );
            hasStock = false;
          }
        });

        if (hasStock) {
          this.router.navigateByUrl('/checkout');
        }
      });
  }
}

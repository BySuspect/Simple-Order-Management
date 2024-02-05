import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  product!: Product;
  constructor(
    activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        productService
          .getProductById(params.id)
          .pipe(
            catchError((error) => {
              this.toastrService.error(error['error'], 'Error');
              return throwError(error.error);
            }),
          )
          .subscribe((serverProduct) => {
            this.product = serverProduct;
          });
      }
    });
  }
  ngOnInit(): void {}

  addToCart(): void {
    this.cartService.addToCart(this.product);
    this.router.navigateByUrl('/cart-page');
  }
}

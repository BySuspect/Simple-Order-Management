import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { PRODUCTS_DROP_STOCK_URL } from 'src/app/shared/constants/urls';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css'],
})
export class TestPageComponent {
  constructor(
    private productService: ProductService,
    private actvatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  test1() {
    console.log('test1 click');
    this.http
      .post(PRODUCTS_DROP_STOCK_URL, {
        productId: '65a5507361e232d8dff03cd3',
        quantity: 1,
      })
      .pipe(
        tap({
          next: (any) => {
            console.log(any);
          },
          error: (error) => {
            console.error(error);
          },
        })
      );
  }
}

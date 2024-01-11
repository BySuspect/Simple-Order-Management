import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    actvatedRoute: ActivatedRoute
  ) {
    let productsObservable: Observable<Product[]>;
    actvatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        productsObservable = this.productService.getAllProductsBySearchTerm(
          params.searchTerm
        );
      else productsObservable = productService.getAll();

      productsObservable.subscribe((serverProducts) => {
        this.products = serverProducts;
      });
    });
  }
}

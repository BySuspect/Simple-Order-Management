import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    actvatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        this.products = this.productService.getAllProductsBySearchTerm(
          params.searchTerm
        );
      } else {
        this.products = productService.getAll();
      }
    });
  }
}

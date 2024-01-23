import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'panel-products-list',
  templateUrl: './panel-products-list.component.html',
  styleUrls: ['./panel-products-list.component.css'],
})
export class PanelProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnInit(): void {}
}

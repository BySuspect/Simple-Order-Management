import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'panel-products-list-item',
  templateUrl: './panel-products-list-item.component.html',
  styleUrls: ['./panel-products-list-item.component.css'],
})
export class PanelProductsListItemComponent {
  @Input()
  product!: Product;

  productEditForm!: FormGroup;

  constructor(private productService: ProductService) {}

  updateProduct(product: Product) {
    let priceInput = document.querySelector(
      `[name="price"]`,
    ) as HTMLInputElement;

    let sizeInput = document.querySelector(`[name="size"]`) as HTMLInputElement;

    let stockInput = document.querySelector(
      `[name="stock"]`,
    ) as HTMLInputElement;

    this.product.price = parseFloat(priceInput.value);
    this.product.size = sizeInput.value;
    this.product.stock = parseInt(stockInput.value);

    this.productService.updateProduct(product).subscribe((product) => {
      console.log(product);
    });
  }
  deleteProduct(product: Product) {
    this.productService.updateProduct(product).subscribe((product) => {
      console.log(product);
    });
  }
}

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

  updateProduct() {
    const newProduct = this.product;
    let priceInput = document.querySelector(
      `[name="${this.product.id}-price"]`,
    ) as HTMLInputElement;

    let sizeInput = document.querySelector(
      `[name="${this.product.id}-size"]`,
    ) as HTMLInputElement;

    let stockInput = document.querySelector(
      `[name="${this.product.id}-stock"]`,
    ) as HTMLInputElement;

    newProduct.price = parseFloat(priceInput.value);
    newProduct.size = sizeInput.value;
    newProduct.stock = parseInt(stockInput.value);
    this.productService.updateProduct(newProduct).subscribe((product: any) => {
      console.log(product.stock);
    });
  }
  deleteProduct() {}
}

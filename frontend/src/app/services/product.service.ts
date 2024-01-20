import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import { sample_product } from 'src/data';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  PRODUCT_BY_ID_URL,
  PRODUCT_BY_SEARCH_URL,
  PRODUCT_DROP_STOCK_URL,
  PRODUCTS_URL,
  PRODUCT_UPDATE_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  getAllProductsBySearchTerm(searchTerm: string) {
    return this.http.get<Product[]>(PRODUCT_BY_SEARCH_URL + searchTerm);
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(PRODUCT_BY_ID_URL + id);
  }

  dropStock(product: Product, quantity: number) {
    return this.http.post(PRODUCT_DROP_STOCK_URL, {
      productId: product.id,
      quantity: quantity,
    });
  }

  updateProduct(product: Product) {
    return this.http.post(PRODUCT_UPDATE_URL, product);
  }
}

import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import { sample_product } from 'src/data';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  PRODUCTS_BY_ID_URL,
  PRODUCTS_BY_SEARCH_URL,
  PRODUCTS_DROP_STOCK_URL,
  PRODUCTS_URL,
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
    return this.http.get<Product[]>(PRODUCTS_BY_SEARCH_URL + searchTerm);
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(PRODUCTS_BY_ID_URL + id);
  }

  dropStock(product: Product, quantity: number) {
    return this.http.post(PRODUCTS_DROP_STOCK_URL, {
      productId: product.id,
      quantity: quantity,
    });
  }
}

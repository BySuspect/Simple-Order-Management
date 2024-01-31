import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { PRODUCT_DROP_STOCK_URL } from 'src/app/shared/constants/urls';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css'],
})
export class TestPageComponent {
  constructor(
    private productService: ProductService,
    private actvatedRoute: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    private cookieService: CookieService,
  ) {}

  test1() {
    console.log('test1 click');
    this.cookieService.set('test', 'test');
  }
}

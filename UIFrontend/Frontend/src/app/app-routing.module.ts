import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { TestPageComponent } from './components/pages/test-page/test-page.component';
import { adminGuard } from './auth/guards/admin.guard';
import { AdminPanelPageComponent } from './components/pages/admin-panel-page/admin-panel-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestPageComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'products/:id', component: ProductPageComponent },
  { path: 'products/:id', component: ProductPageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'panel',
    component: AdminPanelPageComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'payment/:id',
    component: PaymentPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'track/:orderId',
    component: OrderTrackPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    component: OrdersPageComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

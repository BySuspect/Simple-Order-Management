const BASE_URL = 'http://localhost:5050/api';

//Product
export const PRODUCTS_URL = BASE_URL + '/products';
export const PRODUCTS_BY_SEARCH_URL = PRODUCTS_URL + '/search/';
export const PRODUCTS_BY_ID_URL = PRODUCTS_URL + '/';
export const PRODUCTS_DROP_STOCK_URL = PRODUCTS_URL + '/dropstock';

//User
export const USERS_URL = BASE_URL + '/users';
export const USER_LOGIN_URL = USERS_URL + '/login';
export const USER_REGISTER_URL = USERS_URL + '/register';

//Order
export const ORDERS_URL = BASE_URL + '/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL =
  ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';

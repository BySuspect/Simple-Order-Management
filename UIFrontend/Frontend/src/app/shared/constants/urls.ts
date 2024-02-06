const BASE_URL = 'http://localhost:5000/api';
const API_VERSION = '/v1';

const API_URL = BASE_URL + API_VERSION;

//Product
export const PRODUCTS_URL = API_URL + '/products';
export const PRODUCT_BY_SEARCH_URL = PRODUCTS_URL + '/search/';
export const PRODUCT_BY_ID_URL = PRODUCTS_URL + '/';
export const PRODUCT_DROP_STOCK_URL = PRODUCTS_URL + '/dropstock';
export const PRODUCT_UPDATE_URL = PRODUCTS_URL + '/update';

//AUTH
export const AUTH_URL = API_URL + '/Auth';
export const USER_REGISTER_URL = AUTH_URL + '/register';
export const USER_LOGIN_URL = AUTH_URL + '/login';

//Order
export const ORDERS_URL = API_URL + '/orders';
export const ORDERS_BY_USER = ORDERS_URL + '/user/';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_CANCEL_URL = ORDERS_URL + '/cancel';
export const ORDER_DELETE_URL = ORDERS_URL + '/delete/';
export const ORDER_NEW_FOR_CURRENT_USER_URL =
  ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';

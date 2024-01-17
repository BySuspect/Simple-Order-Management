import { CartItem } from './CartItem';
import { LatLng } from 'leaflet';

export class Order {
  id!: number;
  items!: CartItem[];
  totalPrice!: number;
  name!: string;
  address!: string;
  addressLatLng?: LatLng;
  paymentId!: string;
  createdAt!: string;
  status!: string;
}

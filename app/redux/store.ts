import { Costomer } from '../models/costomer';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { CartItem } from '../models/cart-item';
import { Order } from '../models/order';
import { Manager } from '../models/manager';

export class Store {
    public isLoggedIn: boolean;
    public isLoggedAdminIn: boolean;
    public costomer: Costomer;
    public products: Product[];
    public productsByCategory: Product[];
    public shoppingCart: ShoppingCart;
    public cartItems: CartItem[] = [];
    public orders: Order[] = [];
    public allOrdersNumber: number = 0;
    public admin: Manager
}
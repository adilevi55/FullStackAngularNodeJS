import { Store } from './store';
import { Action } from './action';
import { ActionType } from './action-type';
import { CartItem } from '../models/cart-item';

export class Reducer {

    public static reduce(oldStore: Store, action: Action): Store {

        const newStore = { ...oldStore };

        switch (action.type) {
            // castomer 
            case ActionType.Login:
                newStore.costomer = action.payload;
                break;

            case ActionType.Register:
                newStore.costomer = action.payload;
                break;
            
                // Oreder
            case ActionType.GetAllOrders:
                newStore.orders = action.payload;
                break;
            
                //Products
            case ActionType.GetAllProducts:
                newStore.products = action.payload;
                break;

            case ActionType.GetAllProductsByCategory:
                newStore.productsByCategory = action.payload;
                break;
                
            // ShoppingCart
            case ActionType.AddShoppingCart:
                newStore.shoppingCart = action.payload;
                break;

            case ActionType.GetAllCatItems:
                newStore.cartItems = action.payload;
                break;

            case ActionType.GetShoppingCart:
                newStore.shoppingCart = action.payload;
                break;

            case ActionType.AddCatItems:
                newStore.cartItems.push(action.payload);
                break;

            case ActionType.IsLoggedIn:
                newStore.isLoggedIn = action.payload;
                break;

            case ActionType.LogOut:
                newStore.isLoggedIn = action.payload;
                break;

            case ActionType.IsLoggedAdminIn:
                newStore.isLoggedAdminIn = action.payload;
                break;

            case ActionType.DeleteAllItemsCart:
                newStore.cartItems = action.payload;
                break;

            case ActionType.GetAllOrdersNumber:
                newStore.allOrdersNumber = action.payload;
                break;

            case ActionType.AddOrder:
                newStore.orders.push(action.payload);
                break;

            case ActionType.DeleteOneItemsCart:
                newStore.cartItems = action.payload;
                break;

            case ActionType.AdminLogin:
                newStore.admin = action.payload;
                break;

            case ActionType.UpdateProduct:
                newStore.products = action.payload;
                break;

            case ActionType.AddProduct:
                newStore.products.push(action.payload);
                break;
        }
        return newStore
    }
}
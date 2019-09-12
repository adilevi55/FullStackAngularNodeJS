import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { ActionType } from '../redux/action-type';
import { CartItem } from '../models/cart-item';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    public localStoregeShopingCart: any;
     
    constructor(private http: HttpClient,      
         private store: NgRedux<Store>) { }
         token(){
            const httpOptions = {
                headers: new HttpHeaders({
                  'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                })
            }
            return httpOptions;
         }
      
    
         getShoppingCart(_shoppingCartId: string) {
        this.http.get<ShoppingCart>("http://localhost:3000/api/shopping-cart/" + _shoppingCartId,  this.token())
            .subscribe(shoppingCart => {
                const action = { type: ActionType.GetShoppingCart, payload: shoppingCart }
                this.store.dispatch(action);

            }, res => {
                alert(res.error.message)
            });
    };

    checkUserCartMuchLocalStoregCart(costomer_id: string): boolean {
        this.localStoregeShopingCart = JSON.parse(localStorage.getItem("shoppingCart " + costomer_id));
        if (this.localStoregeShopingCart) {
            if (costomer_id == this.localStoregeShopingCart.costomer) {
                return true
            }
            else {
                return false
            }
        }
        return false

    };

    getShoppingCartPromis(_shoppingCartId: string) {
        return new Promise((resolve, reject) => {
            this.http.get<ShoppingCart>("http://localhost:3000/api/shopping-cart/" + _shoppingCartId,   this.token())
                .subscribe(shoppingCart => {
                    const action = { type: ActionType.GetShoppingCart, payload: shoppingCart }
                    this.store.dispatch(action)
                    resolve()

                }, res => {
                    reject(res)
                });
        })
    };



    addShoppingCart(shoppingCart: ShoppingCart) {
        this.http.post<ShoppingCart>("http://localhost:3000/api/shopping-cart", shoppingCart,  this.token())
            .subscribe(shoppingCart => {
                localStorage.setItem("shoppingCart " + shoppingCart.costomer, JSON.stringify(shoppingCart));
                this.store.dispatch({ type: ActionType.AddShoppingCart, payload: shoppingCart });
            }, res => {
                alert(res.error.message)
            });
    }

    addShoppingCartPromis(shoppingCart: ShoppingCart) {
        return new Promise((resolve, reject) => {
            this.http.post<ShoppingCart>("http://localhost:3000/api/shopping-cart", shoppingCart,  this.token())
                .subscribe(shoppingCart => {
                    localStorage.setItem("shoppingCart " + shoppingCart.costomer, JSON.stringify(shoppingCart))
                    this.store.dispatch({ type: ActionType.AddShoppingCart, payload: shoppingCart });

                    resolve(shoppingCart)
                }, res => {
                    reject(res)
                });
        })
    }

    getCartItem(_shoppingCartId: string) {
        const observable = this.http.get<CartItem[]>("http://localhost:3000/api/cart-item/cart-items/" + _shoppingCartId,   this.token())
        observable.subscribe(cartItem => {
            const action = { type: ActionType.GetAllCatItems, payload: cartItem }
            this.store.dispatch(action);
        }, res => {
            alert(res.error.message)
        });
    };

    addCartItem(cartItem: CartItem) {
        this.http.post<ShoppingCart>("http://localhost:3000/api/cart-item", cartItem,   this.token())
            .subscribe(cartItem => {
                this.store.dispatch({ type: ActionType.AddCatItems, payload: cartItem });
            }, res => {
                alert(res.error.message)
            });
    }


    deleteAllCartItems(_shoppingCartItemId: string) {
        this.http.delete<string>(" http://localhost:3000/api/cart-item/cart-items/" + _shoppingCartItemId,   this.token())
            .subscribe(() => {
                this.store.dispatch({ type: ActionType.DeleteAllItemsCart, payload: [] });
            }, res => {
                alert(res.error.message)
            });
    }
    deleteOneCartItems(_cartItemId: string) {
        this.http.delete<ShoppingCart>("  http://localhost:3000/api/cart-item/" + _cartItemId,  this.token())
            .subscribe(() => {
                let cartItemsAfterFilter = this.store.getState().cartItems.filter(cartItem => cartItem._id !== _cartItemId);
                this.store.dispatch({ type: ActionType.DeleteOneItemsCart, payload: cartItemsAfterFilter });
            }, res => {
                alert(res.error.message)
            });
    }
}

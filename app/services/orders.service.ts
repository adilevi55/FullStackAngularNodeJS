import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { ActionType } from '../redux/action-type';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    
    constructor(
        private http: HttpClient,
        private store: NgRedux<Store>,
        private router: Router) { 
      
        }

        token(){
            const httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + sessionStorage.getItem("token")
                })
            }
            return httpOptions;
         }

    getAllOrders(): any {
        const observable = this.http.get<Order[]>("http://localhost:3000/api/order/orders/all-orders")
        observable.subscribe(orders => {
            let action = { type: ActionType.GetAllOrdersNumber, payload: orders.length }
            this.store.dispatch(action);
        }, res => {
            alert(res.error.message)
        });
    };


     getAllCostomerOrders(costomerId: string) {
        const observable = this.http.get<Order[]>("http://localhost:3000/api/order/orders/" + costomerId,  this.token())
        observable.subscribe(orders => {
            let action = { type: ActionType.GetAllOrders, payload: orders };
            this.store.dispatch(action);
        }, res => {
            alert(res.error.message)
        });
    };

    addCostomerOrders(order: Order) {
        const observable = this.http.post<Order>("http://localhost:3000/api/order", order,this.token())
        observable.subscribe(order => {
            let action = { type: ActionType.AddOrder, payload: order };
            this.store.dispatch(action);
            this.store.dispatch({ type: ActionType.GetAllCatItems, pyload: [] })
            this.store.dispatch({ type: ActionType.GetShoppingCart, pyload: undefined })
            localStorage.removeItem("shoppingCart " + order.costomer);
            alert("Your purchase was successful");
            this.router.navigate(["/home"]);
        }, res => {
            alert(res.error.message)
        });
    };
}

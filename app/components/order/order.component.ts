import { Component, OnInit, OnDestroy } from '@angular/core';
import { CostomerService } from 'src/app/services/costomer.service';
import { Order } from 'src/app/models/order';
import { Costomer } from 'src/app/models/costomer';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { OrdersService } from 'src/app/services/orders.service';
import { CartItem } from 'src/app/models/cart-item';

export interface City {
    Name: string;
}
@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    public cities: City[];
    public order = new Order();
    public costomer: Costomer;
    public shoppingCart: ShoppingCart;
    public totalCartPrice: number;
    public cartItem: CartItem[];
    public costomerCity: string;
    public cartItemLength: number;
    public myFilter: any


    constructor(private costomerService: CostomerService,
        private store: NgRedux<Store>,
        private orderService: OrdersService,

    ) { }

    ngOnInit() {
        this.myFilter = (d: Date): boolean => {
            const day = d.getDay();
            const allDates = d.getTime();
            const todayDate = new Date();
            let toWeekesFormTodayDate = new Date().getTime()+ 1209600000;
            
            return day !== 5 && day !== 6 && allDates >= todayDate.getTime() && allDates <= toWeekesFormTodayDate;
        }
        this.costomer = this.store.getState().costomer;
        this.shoppingCart = JSON.parse(localStorage.getItem("shoppingCart " + this.costomer._id));
        this.order.shoppingCart = this.shoppingCart._id;

        this.order.costomer = this.costomer._id;
        this.order.streetToShip = this.costomer.street;
        this.order.cityToShip = this.costomer.city;
        const today = new Date();
        const tomorrow = new Date();
        if(today.getDay() == 5){
            const sunday = new Date();
            sunday.setDate(today.getDate() + 2);
            this.order.dateToShip = sunday;
        }
        else{
            if(today.getDay() == 4){
                const sunday = new Date();
                sunday.setDate(today.getDate() + 3);
                this.order.dateToShip = sunday;
            }
            else{
                tomorrow.setDate(today.getDate() + 1);
                this.order.dateToShip = tomorrow;
            }
        }
       
        this.cartItem = this.store.getState().cartItems;
        this.cartItemLength = this.cartItem.length;
        this.totalCartPrice = 0;
        this.cartItem.forEach(item => {
            this.totalCartPrice += item.generalPrice
        });
        this.order.finalPrice = this.totalCartPrice;
        this.costomerService.getAllCities()
            .subscribe(cities => {
                this.cities = cities.result.records;

            }, res => {
                alert(res.error.message)
            });
    };

    ChangingCityValue(event) {
        this.order.cityToShip = event.source.selected._element.nativeElement.innerText.trim();
    }

    orderShoppingCart() {

        this.order.costomer = this.costomer._id;
        this.order.shoppingCart = this.shoppingCart._id;
        this.totalCartPrice = 0;
        this.cartItem = this.store.getState().cartItems;
        this.cartItem.forEach(item => {
            this.totalCartPrice += item.generalPrice
        });
        this.order.finalPrice = this.totalCartPrice;
        this.orderService.addCostomerOrders(this.order);
    };

};

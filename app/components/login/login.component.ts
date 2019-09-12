import { Component, OnInit } from '@angular/core';
import { Costomer } from 'src/app/models/costomer';
import { CostomerService } from 'src/app/services/costomer.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { Unsubscribe } from 'redux';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    public costomer = new Costomer();
    public costomer2: Costomer;
    public cheackShoppingCart: boolean;
    private unsubscribe: Unsubscribe;
    private shoppingCart: ShoppingCart;

    constructor(
        private loginService: LoginService,
        private store: NgRedux<Store>,
        private cartService: CartService,
        private router: Router
    ) { }

    ngOnInit() {

        this.unsubscribe = this.store.subscribe(async () => {
            /// check if the use hase opne cart
            if (this.store.getState().isLoggedIn != true) {

            }
            else {

                this.costomer2 = this.store.getState().costomer;
                if (localStorage.getItem("shoppingCart " + this.costomer2._id) != null) {
                    if (this.cartService.checkUserCartMuchLocalStoregCart(this.costomer2._id)) {
                        this.cheackShoppingCart = true;
                    }
                    else {
                        this.cheackShoppingCart = false;

                    }

                }

            }

        });

    }

    logIn() {
        this.loginService.login(this.costomer);
    }


    startShopping() {
        this.router.navigate(["/shopping-page/all-products"]);
    }

    async resumeShopping() {
        this.router.navigate(["/shopping-page/all-products"]);
    }
    public ngOnDestroy(): void {
        this.unsubscribe();
    }
}

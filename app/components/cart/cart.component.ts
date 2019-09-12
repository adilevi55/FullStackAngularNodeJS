import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { Costomer } from 'src/app/models/costomer';
import { CartService } from 'src/app/services/cart.service';
import { Unsubscribe } from 'redux';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    animations: [
        trigger('fade',
            [
                state('void', style({ opacity: 0 })),
                transition(':enter', [animate(300)]),
                transition(':leave', [animate(500)]),
            ]
        )]
})
export class CartComponent implements OnInit, OnDestroy {

    public cartItem: CartItem[];
    public shoppingCart: ShoppingCart;
    public castomer: Costomer;
    private unsubscribe: Unsubscribe;
    public totalCartPrice: number;
    public cartItemLength: number;
    private shoppingCartLocalStorage: any;


    constructor(
        private store: NgRedux<Store>,
        private cartService: CartService) { }

    async ngOnInit() {

        this.castomer = await this.store.getState().costomer;
        this.shoppingCartLocalStorage = localStorage.getItem("shoppingCart " + this.castomer._id);
        /// check if ther is cart in localStorage
        if (this.shoppingCartLocalStorage == null) {
            /// add new cart
            this.shoppingCart = new ShoppingCart(undefined, this.castomer._id, new Date());
            this.cartService.addShoppingCartPromis(this.shoppingCart)
            try {
                this.shoppingCart = await this.cartService.addShoppingCartPromis(this.shoppingCart)
            }

            catch (res) {
                alert(res.error.message)

            };
            this.cartService.getCartItem(this.shoppingCart._id);
        }
        else {

            /// cheak if the cart in the localStorage is much the user 
            if (await this.cartService.checkUserCartMuchLocalStoregCart(this.castomer._id)) {
                // open the user cart and get all cart Item
                this.shoppingCart = JSON.parse(localStorage.getItem("shoppingCart " + this.castomer._id));
                await this.cartService.getCartItem(this.shoppingCart._id);
                this.cartItem = await this.store.getState().cartItems;
                if (this.cartItem != undefined) {
                    if (this.cartItem.length > 0) {
                        this.cartItemLength = this.cartItem.length;
                        this.totalCartPrice = 0;
                        this.cartItem.forEach(item => {
                            this.totalCartPrice += item.generalPrice
                        });
                    }
                    else {
                        this.cartItemLength = 0;
                        this.totalCartPrice = 0;
                    }
                }
            }
            else {
                /// add new cart becose the cart in the localStoreg not belong to this user
                this.shoppingCart = new ShoppingCart(undefined, this.castomer._id, new Date());
                this.cartService.addShoppingCartPromis(this.shoppingCart)
                try {
                    this.shoppingCart = await this.cartService.addShoppingCartPromis(this.shoppingCart)
                }

                catch (res) {
                    alert(res.error.message)

                };
                this.cartService.getCartItem(this.shoppingCart._id);
            }

        }



        this.unsubscribe = this.store.subscribe(() => {
            this.shoppingCart = this.store.getState().shoppingCart;
            this.cartItem = this.store.getState().cartItems;
            if (this.cartItem != undefined) {
                if (this.cartItem.length > 0) {
                    this.cartItemLength = this.cartItem.length;

                    this.totalCartPrice = 0;
                    this.cartItem.forEach(item => {
                        this.totalCartPrice += item.generalPrice
                    });
                }
                else {
                    this.totalCartPrice = 0;
                    this.cartItemLength = 0;
                }

            }
        });


    };

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(e) {
        if (window.pageYOffset > 40) {
            let element = document.getElementById('cartPhonePageNav');
            element.classList.add('sticky');
        } else {
            let element = document.getElementById('cartPhonePageNav');
            element.classList.remove('sticky');
        }
    }
    deleteCartItem(shoppingCartItem) {
        this.cartService.deleteOneCartItems(shoppingCartItem);
    }
    deleteAllCartItem() {
        let shoppingCartForDeleteAllItems = JSON.parse(localStorage.getItem("shoppingCart " + this.castomer._id))
        this.cartService.deleteAllCartItems(shoppingCartForDeleteAllItems._id);
    }
    ngOnDestroy(): void {
        this.unsubscribe();
    }

}

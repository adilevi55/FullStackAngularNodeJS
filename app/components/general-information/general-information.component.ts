import { Component, OnInit, OnDestroy } from '@angular/core';
import { CostomerService } from 'src/app/services/costomer.service';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { ProductsService } from 'src/app/services/products.service';
import { Unsubscribe } from 'redux';
import { Order } from 'src/app/models/order';
import { Costomer } from 'src/app/models/costomer';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { OrdersService } from 'src/app/services/orders.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent implements OnInit,OnDestroy{
   
    public ordersNumber: number;
    public productsNumber: number;
    private unsubscribe: Unsubscribe;
    public costomer: Costomer;
    public shoppingCart: ShoppingCart;
    public lastOrderdate: Date;
    public openCartDate: Date;
    public lastShoppingCartdate: string;
    public lastOrder: string;
    public welcomeUseMessage:string;
    public orders:Order[];
    public shoppingCartLocalStorage: any;
    public cartItem: CartItem[];
    public cartItemLength: number;
    public shoppingCartPrice: number;

  constructor(private store:NgRedux<Store>,
   private productService:ProductsService,
   private cartService:CartService,
   private ordersService:OrdersService) {  }

  ngOnInit():void {
      //         get all   orders
      this.productService.getAllProducts();
      this.ordersService.getAllOrders();
    this.unsubscribe = this.store.subscribe(()=>{
                    //  get all   orders
        this.ordersNumber= this.store.getState().allOrdersNumber;
            //         get all   products
            if(this.store.getState().products != undefined){
                this.productsNumber = this.store.getState().products.length;
            }
                    // check if costomer log in 
    if(this.store.getState().costomer){
        this.costomer = this.store.getState().costomer;
        this.shoppingCartLocalStorage = localStorage.getItem("shoppingCart " + this.costomer._id);
   
        // check if costomer has shopping cart open
        if(this.shoppingCartLocalStorage == null){
           this.ordersService.getAllCostomerOrders(this.costomer._id);
       
           // check if costomer has purchases
            if(this.store.getState().orders.length > 0 ){
                let lastOrderIndexNumber = this.store.getState().orders.length -1;
                this.lastOrderdate = this.store.getState().orders[lastOrderIndexNumber].dateToShip;
                    
            }
            else{
                /// user dont have purchase and open cart 
               this.welcomeUseMessage = "Welcome "  + this.costomer.userName
            }          
        }
        else{
                            /// user  have cart Open 
            this.shoppingCartLocalStorage = JSON.parse(this.shoppingCartLocalStorage);   
            this.openCartDate = this.shoppingCartLocalStorage.cartCreationDate;
            this.shoppingCart = this.shoppingCartLocalStorage;
            this.cartService.getCartItem(this.shoppingCart._id);
            this.cartItem = this.store.getState().cartItems;
            if (this.cartItem != undefined) {
                if (this.cartItem.length > 0) {
                    this.cartItemLength = this.cartItem.length;

                    this.shoppingCartPrice = 0;
                    this.cartItem.forEach(item => {
                        this.shoppingCartPrice += item.generalPrice
                    });
                }
                else {
                    this.shoppingCartPrice = 0;
                    this.cartItemLength = 0;
                }

            }
        }
    }
    else{
        this.costomer = undefined;
    }
});
  };

  ngOnDestroy(): void {
    this.unsubscribe();    
}
}

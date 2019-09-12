import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { DialogData } from '../all-products/all-products.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
    selector: 'app-dialog-product',
    templateUrl: './dialog-product.component.html',
    styleUrls: ['./dialog-product.component.css']
})
export class DialogProductComponent implements OnInit {


    constructor(

        public dialogRef: MatDialogRef<DialogProductComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private cartService: CartService
    ) { }
    public products: Product[];
    public shoppingCart: ShoppingCart;
    public cartItem: CartItem;
    public productName: string;
    public price: number;
    public img: string;
    public shoppingCart_id: string;
    public quantity: number;


    ngOnInit() {
        this.productName = this.data.productName;
        this.price = this.data.productPrice;
        this.img = this.data.productImg;
        this.shoppingCart_id = this.data.shoppingCart_id;
        this.quantity = 1;
    }

    save() {

        let generalPrice = this.quantity * this.data.productPrice;
        this.cartItem = new CartItem(undefined, this.data.productId, this.quantity, generalPrice, this.shoppingCart_id);
        this.cartService.addCartItem(this.cartItem)
        this.dialogRef.close();


    }
    cancel() {
        this.dialogRef.close();
    }
}

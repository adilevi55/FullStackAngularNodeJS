import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { CartItem } from 'src/app/models/cart-item';
import { Unsubscribe } from 'redux';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { MatDialog } from '@angular/material';
import { Params, ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';

export interface DialogData {

    productId: string
    productName: string;
    productImg: string;
    productPrice: number;
    shoppingCart_id: string;
}

@Component({
    selector: 'app-all-products',
    templateUrl: './all-products.component.html',
    styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit, OnDestroy {

    public products: Product[];
    public quantity: number;
    public shoppingCart: ShoppingCart;
    public cartItem: CartItem;
    public productId: string
    public productName: string;
    public productImg: string;
    public productPrice: number;
    private unsubscribe: Unsubscribe;
    public costomerId:string;

    constructor(
        private store: NgRedux<Store>,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private productService: ProductsService,
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {

            if (params['productsCategory']) {
                this.productService.getCategory(params['productsCategory'])
                    .subscribe(category => {
                        this.productService.getAllProductsByCategory(category[0]._id);

                    }, res => {
                        alert(res.error.message)
                    });
            }
            else {
                this.productService.getAllProducts();
                this.products = this.store.getState().products;

            }
        });
        this.costomerId = this.store.getState().costomer._id;
        this.shoppingCart = JSON.parse(localStorage.getItem("shoppingCart " + this.costomerId));
        this.unsubscribe = this.store.subscribe(() => {
            this.products = this.store.getState().products;
            this.shoppingCart = this.store.getState().shoppingCart;
        });

    }

    openDialog(productId, productName, productImg, productPrice): void {
        this.productId = productId;
        this.productName = productName;
        this.productImg = productImg;
        this.productPrice = productPrice;
        this.shoppingCart = JSON.parse(localStorage.getItem("shoppingCart " + this.costomerId));
        const dialogRef = this.dialog.open(DialogProductComponent, {
            width: '250px',
            data: {
                productId: this.productId,
                productName: this.productName,
                productImg: this.productImg,
                productPrice: this.productPrice,
                shoppingCart_id: this.shoppingCart._id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

}


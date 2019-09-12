import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Product } from 'src/app/models/product';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { CartItem } from 'src/app/models/cart-item';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Unsubscribe } from 'redux';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

    public products: Product[];
    public quantity: number;
    public shoppingCart: ShoppingCart;
    public cartItem: CartItem;
    private unsubscribe: Unsubscribe;
    public navLinks: Array<object>;
    constructor(private store: NgRedux<Store>,
        private productsService: ProductsService) { }

    ngOnInit() {
        this.navLinks = [
            { path: "all-products", label: "All Products" },
            { path: "milk&Eggs", label: "Milk & Eggs" },
            { path: "frot", label: "Fruits" },
            { path: "meat&Fish", label: "Meat & Fish" },
            { path: "alcoholicDrinks", label: "Alcoholic drinks" },
            { path: "softDrinks", label: "Soft drinks" }
        ]
        this.products = this.store.getState().products;
        this.unsubscribe = this.store.subscribe(() => {
            this.products = this.store.getState().products;
        });
    }
    @HostListener('window:scroll', ['$event'])
    onWindowScroll(e) {
        if (window.pageYOffset > 40) {
            let element = document.getElementById('ProductPageNavbar');
            element.classList.add('sticky');
        } else {
            let element = document.getElementById('ProductPageNavbar');
            element.classList.remove('sticky');
        }
    }

    search(searchproductInput) {
        if (searchproductInput == "") {
            alert("you need to put the Product name");
            return;
        }
        else {
            this.productsService.getAllProductsSearch(searchproductInput)

        }
    }

    searchPhone(searchproductInput) {
        if (searchproductInput == "") {
            alert("you need to put the Product name");
            return;
        }
        else {
            this.productsService.getAllProductsSearch(searchproductInput)

        }
    }
    ngOnDestroy(): void {
        this.unsubscribe();
    }

}

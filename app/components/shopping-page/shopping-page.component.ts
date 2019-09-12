import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-shopping-page',
    templateUrl: './shopping-page.component.html',
    styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnInit {


    public products: Product[];

    constructor(private productsService: ProductsService) { }

    ngOnInit(): void { }

}

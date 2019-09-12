import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { ActionType } from '../redux/action-type';
import { Category } from '../models/category';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ProductsService {


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
    public getAllProducts(): void {
        const observable = this.http.get<Product[]>("http://localhost:3000/api/product/products/all-products")
        observable.subscribe(products => {
            let action = { type: ActionType.GetAllProducts, payload: products }
            this.store.dispatch(action);
        }, res => {
            alert(res.error.message)
        });

    }

    public getAllProductsByCategory(_categoryId: string) {
        const observable = this.http.get<Product[]>("http://localhost:3000/api/product/products/" + _categoryId, this.token())
        observable.subscribe(products => {
            let action = { type: ActionType.GetAllProducts, payload: products }
            this.store.dispatch(action);
        }, res => {
            alert(res.error.message)
        });
    }

    public addProductForm(product: FormData) {
        this.http.post<Product[]>("http://localhost:3000/api/product", product, this.token())
            .subscribe(products => {
                let action = { type: ActionType.GetAllProducts, payload: products }
                this.store.dispatch(action);
                alert("Your Imge Add!");
            }, res => {
                alert(res.error.message)
            });
    }

    public getAllProductsSearch(productSearch: string) {
        const observable = this.http.get<Product[]>("http://localhost:3000/api/product/products-search/" + productSearch, this.token())
        observable.subscribe(products => {
            if (products.length == 0) {
                return alert(productSearch + " is not a product name");
            }
            let action = { type: ActionType.GetAllProducts, payload: products }
            this.store.dispatch(action);
        }, res => {
            alert(res.error.message)
        });
    }

    public getAllProductsSearchAdmin(productSearch: string) {
        const observable = this.http.get<Product[]>("http://localhost:3000/api/product/products-search/" + productSearch, this.token())
        observable.subscribe(products => {
            if (products.length == 0) {
                return alert(productSearch + " is not a product name");
            }
            let action = { type: ActionType.GetAllProducts, payload: products }
            this.store.dispatch(action);
        }, res => {
            alert(res.error.message)
        });
    }



    public getAllCategory(): Observable<Category[]> {
        return this.http.get<Category[]>("http://localhost:3000/api/category/categories/all-categories", this.token())

    }

    public getCategory(categoryName: string): Observable<Category> {
        return this.http.get<Category>("http://localhost:3000/api/category/" + categoryName, this.token())

    }

    public updateProduct(product: FormData, product_id: string) {
        this.http.put<Product>("http://localhost:3000/api/product/" + product_id, product, this.token())
            .subscribe(product => {
                let action = { type: ActionType.GetAllProducts, payload: product }
                this.store.dispatch(action);
                alert("Your Imge Update!")

            }, res => {
                alert(res.error.message)
            });
    }

}

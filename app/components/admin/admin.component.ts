import { Component, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/app/models/category';
import { Unsubscribe } from 'redux';

export interface City {
    _id: string;
    categoryName: string;
}
@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {


    public products: Product[];
    public product = new Product();
    public productEdite = new Product();
    public productEditeCategoryID: string;
    public productEditeCategoryName: string;
    public category: Category;
    public categories: Category[];
    public productEditBoolean: boolean = false;
    public productAddBoolean: boolean = false;
    public addProduct = new Product();
    public formData = new FormData();
    private unsubscribe: Unsubscribe;
    public navCategoryLinks: Array<object>;
    public changSelectTarget: string;

    constructor(private store: NgRedux<Store>,
        private productsService: ProductsService) { }

    ngOnInit() {
            //get All Category from DB
        this.productsService.getAllCategory()
            .subscribe(categories => {
                this.categories = categories
            }, res => {
                alert(res.errors.message)
            });
            
            // listing all the Categories
        this.navCategoryLinks = [
            { categoryName: "frot", label: "Fruits" },
            { categoryName: "milk&Eggs", label: "Milk & Eggs" },
            { categoryName: "meat&Fish", label: "Meat & Fish" },
            { categoryName: "alcoholicDrinks", label: "Alcoholic drinks" },
            { categoryName: "softDrinks", label: "Soft drinks" }
        ];

        this.productsService.getAllProducts();

        // subscribe to redux 
        this.unsubscribe = this.store.subscribe(() => {
            this.products = this.store.getState().products;
        });

    }

    // on scroll the Navbar and UpdateAddProductForm add or remove calls sticky
    @HostListener('window:scroll', ['$event'])
    onWindowScroll(e) {
        if (window.pageYOffset > 40) {
            let desktopProductNavbar = document.getElementById('desktopProductNavbar');
            desktopProductNavbar.classList.add('stickyDesktopProductPageNavbar');
            
            let phoneProductNavbar = document.getElementById('phoneProductNavbar');
            phoneProductNavbar.classList.add('stickyPhoneProductPageNavbar');

            let desktopUpdateAddProductFormDiv = document.getElementById('desktopUpdateAddProductFormDiv');
            desktopUpdateAddProductFormDiv.classList.add('stickyDesktopUpdateAddProductFormDiv');

            let phoneUpdateAddProductFormDiv = document.getElementById('phoneUpdateAddProductFormDiv');
            phoneUpdateAddProductFormDiv.classList.add('stickyPhoneUpdateAddProductFormDiv');
        
        } else {
            let desktopProductNavbar = document.getElementById('desktopProductNavbar');
            desktopProductNavbar.classList.remove('stickyDesktopProductPageNavbar');
            
            let phoneProductNavbar = document.getElementById('phoneProductNavbar');
            phoneProductNavbar.classList.remove('stickyPhoneProductPageNavbar');            
                   
            let desktopUpdateAddProductFormDiv = document.getElementById('desktopUpdateAddProductFormDiv');
            desktopUpdateAddProductFormDiv.classList.remove('stickyDesktopUpdateAddProductFormDiv');

            let phoneUpdateAddProductFormDiv = document.getElementById('phoneUpdateAddProductFormDiv');
            phoneUpdateAddProductFormDiv.classList.remove('stickyPhoneUpdateAddProductFormDiv');        }
    }

    onFileSelected(file: FileList) {
        if (file.length > 0) {
            this.product.img = file[0].name;
            this.formData.append("img", file[0], file[0].name);
        }
        else {
            alert("your neet to upload 1 file only")
        }
    };

    edit(product_id, productName, productImg, productPrice, category_id, categoryName) {
        if (this.productAddBoolean !== false) {
            this.productAddBoolean = false;
        };
        this.productsService.getCategory(categoryName)
            .subscribe(async category => {
                this.productEditeCategoryID = await category[0]._id;
            }), res => {
                alert(res.error.message);
            };
        this.changSelectTarget = categoryName;
        this.productEditBoolean = true;
        this.productEditeCategoryName = categoryName;
        this.productEdite.category = category_id;
        this.productEdite.productName = productName;
        this.productEdite.price = productPrice;
        this.productEdite._id = product_id;

    };

    addProductForm() {
        this.formData.append("productName", this.product.productName);
        this.formData.append("category", this.product.category.toString());
        this.formData.append("price", this.product.price.toString());
        this.productsService.addProductForm(this.formData)
    }

    saveEdit() {

        for (let i = 0; this.products.length > i; i++) {

            if (this.productEdite._id == this.products[i]._id) {

                this.formData.append("productName", this.productEdite.productName);
                this.formData.append("category", this.productEdite.category.toString());
                this.formData.append("price", this.productEdite.price.toString());
                this.productsService.updateProduct(this.formData, this.productEdite._id)
                break;

            }
        }
        this.productEditBoolean = false;
    }
    addProductDiv() {
        this.productEditBoolean = false;
        this.productAddBoolean = true;
    }

   search(searchproductInput) {
        if (searchproductInput == "") {
            alert("you need to put the Product name");
            return;
        }
        else {
            this.productsService.getAllProductsSearch(searchproductInput)

        }
    };
    getAllProductCategory(categoryName) {
        if (categoryName === undefined) {
            this.productsService.getAllProducts();

        }
        else {
            this.productsService.getCategory(categoryName)
                .subscribe(category => {
                    this.productsService.getAllProductsByCategory(category[0]._id)
                })
        }

    };
    ChangingValue(event) {
        this.changSelectTarget = event.source.selected._element.nativeElement.innerText.trim();

    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

}

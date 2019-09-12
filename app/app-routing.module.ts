import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { LoginGuardService } from './services/login-guard.service';
import { ProductsComponent } from './components/products/products.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { OrderComponent } from './components/order/order.component';
import { Page404Component } from './components/page404/page404.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent },
    {
        path: "shopping-page", component: ShoppingPageComponent, children: [
            { path: "", redirectTo: 'all-products', pathMatch: 'full' },
            { path: "all-products", component: AllProductsComponent },
            { path: ":productsCategory", component: AllProductsComponent },
        ], canActivate: [LoginGuardService]
    },
    { path: "products", component: ProductsComponent },
    { path: "order", component: OrderComponent, canActivate: [LoginGuardService] },
    { path: "admin", component: AdminComponent, canActivate: [LoginGuardService] },
    { path: "", redirectTo: 'home', pathMatch: 'full' },
    { path: "**", component: Page404Component }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

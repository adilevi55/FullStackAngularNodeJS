import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { Store } from './redux/store';
import { Reducer } from './redux/reducer';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { OrderComponent } from './components/order/order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatNativeDateModule,
    MatMenuModule,
    MatExpansionModule,
    MatBadgeModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { Page404Component } from './components/page404/page404.component';
import { DialogProductComponent } from './components/dialog-product/dialog-product.component';
import { AdminComponent } from './components/admin/admin.component';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreditCardDirectivesModule } from 'angular-cc-library';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        RegisterComponent,
        LoginComponent,
        AboutComponent,
        GeneralInformationComponent,
        MainComponent,
        ShoppingPageComponent,
        CartComponent,
        ProductsComponent,
        AllProductsComponent,
        OrderComponent,
        Page404Component,
        DialogProductComponent,
        AdminComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        NgReduxModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatDialogModule,
        MatCardModule,
        MatTabsModule,
        MatIconModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatMenuModule,
        MatExpansionModule,
        MatBadgeModule,
        CreditCardDirectivesModule
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
    ],
    entryComponents: [
        DialogProductComponent

    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(redux: NgRedux<Store>) {
        redux.configureStore(Reducer.reduce, new Store());
    }
}

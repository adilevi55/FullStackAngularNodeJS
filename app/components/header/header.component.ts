import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { Costomer } from 'src/app/models/costomer';
import { Unsubscribe } from 'redux';
import { ActionType } from 'src/app/redux/action-type';
import { Router } from '@angular/router';
import { Manager } from 'src/app/models/manager';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public costomer: Costomer;
    public userName: string;
    private unsubscribe: Unsubscribe;
    public manager: Manager;
    public managerName: string;
    constructor(private store: NgRedux<Store>,
        private router: Router) { }

    public ngOnInit(): void {
        this.unsubscribe = this.store.subscribe(() => {
            this.costomer = this.store.getState().costomer;
            if (this.costomer != undefined) {
                this.userName = this.costomer.userName;
            };
            if(this.store.getState().admin != undefined)
            this.manager = this.store.getState().admin;
          });
    }
    logOut() {
        let logOutConfirm = confirm("if your logOut your Shopping Cart will be close");
        if(logOutConfirm == true){
            this.store.dispatch({ type: ActionType.Login, payload: false });
            this.store.dispatch({ type: ActionType.LogOut, payload: false });
            sessionStorage.removeItem("token");
            this.router.navigate(["/home"]);
        }

    }

    public ngOnDestroy(): void {
        this.unsubscribe();
    }

}



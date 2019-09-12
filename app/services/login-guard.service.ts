import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { Router } from '@angular/router';
import { ActionType } from '../redux/action-type';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardService {

    constructor(private store: NgRedux<Store>, private router: Router) { }


    public canActivate(): boolean {
        if (this.store.getState().isLoggedAdminIn) {
            this.store.dispatch({ type: ActionType.IsLoggedIn, payload: false });
            return true
        };
        if (this.store.getState().isLoggedIn) return true;
        this.router.navigate(["/home"]);
        return false
    }

}

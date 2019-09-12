import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardAdimService {

    constructor(private store: NgRedux<Store>,
        private router: Router) { }

    public canActivate(): boolean {
        if (this.store.getState().isLoggedAdminIn) return true;
        this.router.navigate(["/home"]);
        return false;
    }
}

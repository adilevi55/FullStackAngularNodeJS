import { Injectable } from '@angular/core';
import { Costomer } from '../models/costomer';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { ActionType } from '../redux/action-type';
import { Router } from '@angular/router';
import { Manager } from '../models/manager';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient, private store: NgRedux<Store>, private router: Router) { }

    login(costomer: Costomer) {
        const observable = this.http.post<any>("http://localhost:3000/api/costomer/logIn", costomer)
        observable.subscribe(newCostomer => {
            if (newCostomer.city == undefined) {
                const admin = new Manager(
                    newCostomer.firstName,
                    newCostomer.lastName,
                    newCostomer.email,
                    undefined,
                    newCostomer.token

                );
                sessionStorage.setItem("token", admin.token);
                this.store.dispatch({ type: ActionType.AdminLogin, payload: admin });
                this.store.dispatch({ type: ActionType.IsLoggedAdminIn, payload: true });
                alert("Hi Admin");
                this.router.navigate(["admin"]);

            }
            else {
                newCostomer = new Costomer(
                    newCostomer.userName,
                    newCostomer._id,
                    newCostomer.firstName,
                    newCostomer.lastName,
                    newCostomer.email,
                    newCostomer.password,
                    newCostomer.phone,
                    newCostomer.city,
                    newCostomer.street,
                    newCostomer.houseNumber,
                    newCostomer.token);
                sessionStorage.setItem("token", newCostomer.token);
                const action = { type: ActionType.Login, payload: newCostomer };
                this.store.dispatch(action);
                this.store.dispatch({ type: ActionType.IsLoggedIn, payload: true });
                alert("your login");
                return true
            }

        }, res => {
            this.store.dispatch({ type: ActionType.IsLoggedIn, payload: false });
            alert(res.error.message);
            return false
        });
    }
}

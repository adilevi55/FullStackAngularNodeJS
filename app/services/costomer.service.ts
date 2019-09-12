import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Costomer } from '../models/costomer';
import { Observable } from 'rxjs';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { ActionType } from '../redux/action-type';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CostomerService {

    constructor(private http: HttpClient,
        private store: NgRedux<Store>,
        private router: Router) { }


    register(costomer: Costomer): void {
        this.http.post<Costomer>("http://localhost:3000/api/costomer/register", costomer)
            .subscribe(newCostomer => {
                sessionStorage.setItem("token", newCostomer.token);
                const action = { type: ActionType.Register, payload: newCostomer }
                this.store.dispatch(action);
                alert("your register");
                this.store.dispatch({ type: ActionType.IsLoggedIn, payload: true });
                this.router.navigate(["/shopping-page/all-products"]);

            }, res => {
                alert(res.error.message)
            });

    };

    getAllCities(): Observable<any> {
        return this.http.get<any>("https://data.gov.il/api/action/datastore_search?resource_id=eb548bfa-a7ba-45c4-be7d-2e8271f55f70")
    };

}

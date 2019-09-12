import { Component, OnInit } from '@angular/core';
import { Costomer } from 'src/app/models/costomer';
import { CostomerService } from 'src/app/services/costomer.service';

export interface City {
    Name: string;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    hide = true;
    public costomer = new Costomer();
    public cities: City[];
    public confirmPassword: string;
    public confirmPasswordCheck: boolean = true;

    constructor(
        private service: CostomerService) { }

    ngOnInit() {

        this.service.getAllCities()
            .subscribe(cities => {
                this.cities = cities.result.records;
            }, res => {
                alert(res.error.message)
            });


    }

    passwordConfirming(passwordInfo, passwordConfirmInfo) {
        if (passwordInfo == passwordConfirmInfo) return { invalid: true }
        return { invalid: false }
    }

    register() {
        if (this.confirmPassword == this.costomer.password) {
            this.service.register(this.costomer)
        }
        else {
            alert("password not much")

        }

    }

}

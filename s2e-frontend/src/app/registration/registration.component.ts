import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "~/app/services/user.service";

@Component({
    selector: "Registration",
    templateUrl: "./registration.component.html",
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    private step: number = 1;
    private isSaving: boolean = false;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService) { }

    ngOnInit(): void { }

    private async continue(): Promise<void> {
        switch(this.step) {
            case 1:
                this.isSaving = true;
                await alert('Continuing');
                this.step = 2;
                this.isSaving = false;
                break;
            case 2:
                alert('COMPLETE');
                break;
        }
    }
}

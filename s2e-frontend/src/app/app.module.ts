import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LogoComponent } from "./logo/logo.component";
import { LoginComponent } from "./login/login.component";
import { LandingComponent } from "./landing/landing.component";
import { ErrorComponent } from "./error/error.component";
import { PersonalDetailsComponent } from "./register/personal-details/personal-details.component";
import { BankAccountsComponent } from "./register/bank-accounts/bank-accounts.component";
import { AddButtonComponent } from "./components/add-button/add-button.component";
import { StepperComponent } from "./components/stepper/stepper.component";
import { AgreementComponent } from "./register/agreement/agreement.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LogoComponent,
        LoginComponent,
        LandingComponent,
        ErrorComponent,
        PersonalDetailsComponent,
        BankAccountsComponent,
        AddButtonComponent,
        StepperComponent,
        AgreementComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }

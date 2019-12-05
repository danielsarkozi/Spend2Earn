import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

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
import { TerminalComponent } from "./terminal/terminal.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { FinancesComponent } from './finances/finances.component';
import { HistoryComponent } from './history/history.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LoadingButtonComponent } from "./components/loading-button/loading-button.component";
import { RegistrationComponent } from "./registration/registration.component";
import { BankAccountFormComponent } from "./register/bank-account-form/bank-account-form.component";
import { FormFieldComponent } from "./components/form-field/form-field.component";
import { CardFormComponent } from "./register/card-form/card-form.component";
import { ApprovalComponent } from "./approval/approval.component";
import { KeyboardComponent } from "./components/keyboard/keyboard.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUIChartModule,
        NativeScriptUISideDrawerModule
        
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
        AgreementComponent,
        TerminalComponent,
        DashboardComponent,
        MenuComponent,
        ProfileComponent,
        FinancesComponent,
        HistoryComponent,
        StatisticsComponent,
        LoadingButtonComponent,
        RegistrationComponent,
        BankAccountFormComponent,
        FormFieldComponent,
        CardFormComponent,
        ApprovalComponent,
        KeyboardComponent
    ],
    entryComponents: [
        BankAccountFormComponent,
        CardFormComponent,
        ApprovalComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }

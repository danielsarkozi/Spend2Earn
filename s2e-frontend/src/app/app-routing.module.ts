import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { LandingComponent } from "./landing/landing.component";
import { PersonalDetailsComponent } from "./register/personal-details/personal-details.component";
import { BankAccountsComponent } from "./register/bank-accounts/bank-accounts.component";
import { AgreementComponent } from "./register/agreement/agreement.component";
import { TerminalComponent } from "./terminal/terminal.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MenuComponent } from "./menu/menu.component";
import { RegistrationComponent } from "./registration/registration.component";


const routes: Routes = [
    { path: "", redirectTo: "/register", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "landing", component: LandingComponent },
    { path: "register", component: RegistrationComponent },
    { path: "bank-accounts", component: BankAccountsComponent },
    { path: "agreement", component: AgreementComponent },
    { path: "terminal", component: TerminalComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "menu", component: MenuComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

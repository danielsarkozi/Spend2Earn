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
<<<<<<< HEAD
import { RegistrationComponent } from "./registration/registration.component";


const routes: Routes = [
    { path: "", redirectTo: "/register", pathMatch: "full" },
=======
import { FinancesComponent } from "./finances/finances.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { ProfileComponent } from "./profile/profile.component";
import { HistoryComponent } from "./history/history.component";


const routes: Routes = [
    { path: "", redirectTo: "/landing", pathMatch: "full" },
>>>>>>> b8a04e39ee84602e7cfd01778ded39cc92275665
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "landing", component: LandingComponent },
    { path: "register", component: RegistrationComponent },
    { path: "bank-accounts", component: BankAccountsComponent },
    { path: "agreement", component: AgreementComponent },
    { path: "terminal", component: TerminalComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "menu", component: MenuComponent },
    { path: "finances", component: FinancesComponent },
    { path: "statistics", component: StatisticsComponent },
    { path: "profile", component: ProfileComponent },
    { path: "history", component: HistoryComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

import { Routes } from "@angular/router";

import { LoginComponent } from './authentication/login/login.component';
import { authGuard } from "./core/service/auth.guard";
import { RegisterComponent } from "./authentication/register/register.component";

const constructorRoutes = () => import('./modules/constructor/constructor.routes').then(x => x.CONSTRUCTOR_ROUTES);
const providerRoutes = () => import('./modules/provider/provider.routes').then(x => x.PROVIDER_ROUTES);

export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'constructor', loadChildren: constructorRoutes, canActivate: [authGuard], data: { userType: 'constructor'} },
    { path: 'provider', loadChildren: providerRoutes, canActivate: [authGuard], data: { userType: 'provider'} },
    { path: '**', redirectTo: '' }
];
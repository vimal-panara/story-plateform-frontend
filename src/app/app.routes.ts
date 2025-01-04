import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "auth/register",
        loadComponent: () => import('./components/auth/register/register.component').then(c => c.RegisterComponent)
    }, 
    {
        path: "auth/login",
        loadComponent: () => import('./components/auth/login/login.component').then(c => c.LoginComponent)
    }, {
        path: "",
        redirectTo: "auth/login",
        pathMatch: "full"
    },
];

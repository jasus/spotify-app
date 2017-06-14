import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";

import { LoginComponent, HomeComponent, SearchComponent  } from "./components/components";



const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: false });

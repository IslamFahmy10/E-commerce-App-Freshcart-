import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CategoryProductsComponent } from './category-products/category-products.component';
import { AccountInfoComponent } from './settings/account-info/account-info.component';
import { ProfileComponent } from './settings/profile/profile.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'home',component:HomeComponent, canActivate:[authGuard]},
  {path:'productDetails/:id',component:ProductDetailsComponent, canActivate:[authGuard]},
  {path:'cart',component:CartComponent,canActivate:[authGuard]},
  {path:'products',component:ProductsComponent,canActivate:[authGuard]},
  {path:'brands',component:BrandsComponent,canActivate:[authGuard]},
  {path:'categories',component:CategoriesComponent,canActivate:[authGuard]},
  { path: 'category/:id', component: CategoryProductsComponent, canActivate: [authGuard] },
  { path: 'brand/:id', component: CategoryProductsComponent, canActivate: [authGuard] },
  {path:'checkOut/:x',component:CheckOutComponent,canActivate:[authGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  {path:'login',component:LoginComponent},
    { path: 'account-info', component: AccountInfoComponent },
  {path:'register',component:RegisterComponent},
  {path:'settings',loadChildren:()=>import('./settings/settings.module').then((m)=>(m.SettingsModule))},
  {path:'**',component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { BrandsComponent } from './brands/brands.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HTTP_INTERCEPTORS, HttpClientModule}from'@angular/common/http';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SeemorePipe } from './seemore.pipe';
import { SearchPipe } from './search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { CheckOutComponent } from './check-out/check-out.component';
import { GlobalHttpInterceptor } from './global-http.interceptor';
import { LoadingComponent } from './loading/loading.component';
import { LoadingInterceptor } from './loading.interceptor';
import { NgOptimizedImage } from '@angular/common';
import { CategoryProductsComponent } from './category-products/category-products.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    NotfoundComponent,
    ProductsComponent,
    RegisterComponent,
    BrandsComponent,
    CartComponent,
    CategoriesComponent,
    SliderComponent,
    FooterComponent,
    ProductDetailsComponent,
    SeemorePipe,
    SearchPipe,
    CheckOutComponent,
    LoadingComponent,
    CategoryProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgOptimizedImage
],
  providers: [
    {provide:HTTP_INTERCEPTORS,
      useClass:GlobalHttpInterceptor,
      multi:true
    },
    {provide:HTTP_INTERCEPTORS,
      useClass:LoadingInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

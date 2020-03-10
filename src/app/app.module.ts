import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainRoutingModule } from './app.routes';
import { RegisterComponent } from './login/register.component';
import { PageModule } from './pages/page.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { SettingsService } from './services/settings/settings.service';
import { ServiceModule } from './services/service.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { PagesComponent } from './pages/pages.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //PageModule, => lo cargaremos de forma dinamica con el load children
    SharedModule,
    MainRoutingModule,
    ReactiveFormsModule
    //ServiceModule //no lo necesito pk uso provideIn root en todos los servicios
  ],
  //providers: [ServiceModule],
  //providers: [SettingsService], //eliminado al crear el módulo de servicios "ServiceModule"
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class AppModule { }

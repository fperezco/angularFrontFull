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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PageModule,
    SharedModule,
    MainRoutingModule,
    ReactiveFormsModule
    //ServiceModule //no lo necesito pk uso provideIn root en todos los servicios
  ],
  //providers: [ServiceModule],
  //providers: [SettingsService], //eliminado al crear el módulo de servicios "ServiceModule"
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class AppModule { }

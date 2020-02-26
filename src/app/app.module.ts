import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainRoutingModule } from './app.routes';
import { RegisterComponent } from './login/register.component';
import { PageModule } from './pages/page.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
//import { SettingsService } from './services/settings/settings.service';
import { ServiceModule } from './services/service.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PageModule,
    SharedModule,
    MainRoutingModule,
    //ServiceModule //no lo necesito pk uso provideIn root en todos los servicios
  ],
  //providers: [ServiceModule],
  //providers: [SettingsService], //eliminado al crear el módulo de servicios "ServiceModule"
  bootstrap: [AppComponent]
})
export class AppModule { }
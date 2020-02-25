import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*import { SettingsService } from './service.index';
import { SharedService } from './shared/shared.service';
import { SidebarService } from './shared/sidebar.service';*/

// voy añadiendo aki servicios
import {
  SettingsService,
  SharedService,
  SidebarService,
 } from './service.index';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ //voy añadiendo aki
    SettingsService,
    SharedService,
    SidebarService
  ]
})
export class ServiceModule { }

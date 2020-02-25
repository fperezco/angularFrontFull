import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';

  //en el settingsService en el constructor ya invoco la fx
  // que intenta obtener las preferencias
  // de forma que, con solo inyectarlo aki ya se ejecuta
  constructor( public _ajustes: SettingsService){

  }
}

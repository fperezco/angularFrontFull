import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
//@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: "assets/stylesheets/theme.css",
    tema: "theme"
  };

  // al meter la invocacion a este metodo en el constructor, con solo inyectarlo en otro lado
  // ya se estará ejecutando
  constructor(@Inject(DOCUMENT) private _document) {
    this.obtenerAjustes();
   }

  guardarAjustes(){
    //console.log("Ajustes guardados");
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  obtenerAjustes(){
    if( localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      //console.log("ajustes cargados de localstorage");
    }
    else{
      //console.log("no hay ajustes en local => uso por defecto");
    }

    this.aplicarTema(this.ajustes.tema);

  }

  aplicarTema(tema: string){
     //manipulamos el DOM para cambiar el archivo .css cargado denominado con id="tema" en el index
    let url = `assets/stylesheets/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);
    console.log("cargo url", url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
  }


}


interface Ajustes{
  temaUrl: string;
  tema: string;
}

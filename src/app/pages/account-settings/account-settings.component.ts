import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document,
              private settingsService: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(color:string, link:any){
    console.log("cambio a tema:",color);
    this.settingsService.aplicarTema(color);
    this.settingsService.guardarAjustes();
    this.aplicarCheck(link);
  }

  aplicarCheck(link: any){
    let selectores:any = document.getElementsByClassName("selector");

    for(let ref of selectores){
      ref.classList.remove('working'); //desmarco todos
    }
    //marco al que sea
    link.classList.add('working');
  }

  // invocado al inicio de esta pantalla
  // coge el color del tema ya seleccionado, recorre los que existen y lo marca
  // con la clase working o seleccionado ( que no subraya en azul)
  colocarCheck(){
    let selectores:any = document.getElementsByClassName("selector");

    let tema = this.settingsService.ajustes.tema;
    for(let ref of selectores){
      if(ref.getAttribute('data-theme') === tema){
        ref.classList.add('working');
        break;
      }
    }
  }

}

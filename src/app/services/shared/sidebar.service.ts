import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [];
  /*menu: any = [
    {
      titulo: 'Principal',
      icono: 'fa fa-home',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard'},
        { titulo: 'ProgressBar', url: '/progress'},
        { titulo: 'Graficas', url: '/graficas1'},
        { titulo: 'Promesas', url: '/promesas'},
        { titulo: 'Rxjs', url: '/rxjs'},
        { titulo: 'Settings', url: '/account-settings'},
        { titulo: 'Perfil', url: '/profile'}
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'fa fa-home',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios'},
        { titulo: 'Hospitales', url: '/hospitales'},
        { titulo: 'Médicos', url: '/medicos'}
      ]
    }

  ];*/
  constructor(private usuarioService: UsuarioService) { 
    //this.menu = JSON.parse(localStorage.getItem('menu'));
    //this.menu = this.usuarioService.menu;
    this.menu = this.usuarioService.getMenu();
    //console.log("ESTEEEE ES EL MENUUU",this.menu);
  }

  /*cargarMenu(){
    this.menu = this.usuarioService.menu;
  }*/

  getMenu(){
    return this.menu;
  }



}

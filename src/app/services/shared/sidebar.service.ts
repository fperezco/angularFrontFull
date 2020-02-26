import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'fa fa-home',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard'},
        { titulo: 'ProgressBar', url: '/progress'},
        { titulo: 'Graficas', url: '/graficas1'},
        { titulo: 'Promesas', url: '/promesas'},
        { titulo: 'Rxjs', url: '/rxjs'},
        { titulo: 'Settings', url: '/account-settings'}
      ]
    },
    {
      titulo: 'Principal2',
      icono: 'fa fa-home',
      submenu: [
        { titulo: 'Test', url: '/test'}
      ]
    }

  ];
  constructor() { }

  getMenu(){
    return this.menu;
  }



}

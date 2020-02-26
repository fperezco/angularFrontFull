import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter,map } from 'rxjs/operators';
//importamos para setear titulo y metas
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string = "";
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta) { 

    this.getDataRoute()
    .subscribe ( data => {
      console.log(data);
      this.label = data.titulo;
      //cambiamos tb el titulo en el navegador! buaf
      title.setTitle(this.label);
      //updateamos los metas
      let metaTag: MetaDefinition = {
        name: 'description',
        content: this.label
      }
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }


  getDataRoute(){

    // me subscribo a los eventos de router
    // y haciendo uso de filter y maps veo cual es el evento que devuelve
    // el data: {titulo: 'Dashboard'} }, que puse en las rutas en 
    //pages.routes.ts, lo filtro y devuelvo
    return this.router.events
    .pipe( 
      filter ( (event: ActivationEnd) => {
        if( event instanceof ActivationEnd && event.snapshot.firstChild === null) {
          return true;
        }
      }),
      map( (event: ActivationEnd) => {
        return event.snapshot.data;
      })
    );

  }

}

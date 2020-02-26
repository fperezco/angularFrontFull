import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {


  // este tipo de variable me permite manejar subscripciones a los 
  // observables
  subscription: Subscription;

  constructor() {
  
    this.subscription = this.regresaObservable()
    .subscribe ( 
      numero => console.log("Subs",numero), //recibo data desde el next(data)
      error => console.log("error en obs", error), //recibo un error
      () => console.log("el observador termino") //ejecutado en el complete
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
      console.log("cambio de pagina => no dessubcribimos");
      this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{

    return  new Observable( observer => {

      let contador = 0;
      let intervalo = setInterval( () => {

        contador += 1;

        let salida = {
          "valor": contador
        }

        observer.next(salida); //notifico fuera

        /*if(contador === 3 ){
          clearInterval(intervalo);
          observer.complete(); //fin del observador
        }*/

        /*if(contador === 2 ){
          clearInterval(intervalo);
          observer.error("viene por el dos"); //notifico un error
        }*/

      }, 500);
    

  // });
   }). pipe(map( (resp: any) => {
       return resp.valor;
   }))
   .pipe(filter( (valor, index) => {

    if(valor % 2 === 1 ){
      //impar
      return true;
    } else {
      // par
      return false;
    }

    //return true; //siempre ha de devolver un booleano
   }))
   ;


  }


}

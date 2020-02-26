import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 




    this.contarTres().then(
      message => console.log("termino",message)
    )
    .catch( error => console.log("error en la promesa", error));


  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean>{

    return new Promise<boolean>( (resolve, reject) => {

      let contador = 0;
      let intervalo = setInterval( () => {
        contador +=1;
        console.log(contador);
        if( contador === 3){
            resolve(true);
            //reject(' esto es un error');
            clearInterval(intervalo); //con esto y el let intervalo = puedo frenar aki la ejecucion
        }
      },1000);

    });

  }



}

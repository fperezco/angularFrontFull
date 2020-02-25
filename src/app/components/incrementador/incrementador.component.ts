import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  
  // vienen especificadas del padre
  @Input() leyenda: string ="leyenda";
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  //recibe un valor que es una referencia a un  elemento html
  @ViewChild('txtProgress') txtProgress: ElementRef;

  constructor() {

   }

  ngOnInit() {
    console.log("leyenda",this.leyenda);
    console.log("progreso",this.progreso);
  }

  incrementar(){
    if(this.progreso< 100){
      this.progreso = this.progreso + 5;
      // emito al padre el cambio de valor
      this.cambioValor.emit(this.progreso);
    }
    // paso el foco al input
    this.txtProgress.nativeElement.focus();
  }

  decrementar(){
    if(this.progreso > 0){
      this.progreso = this.progreso - 5;
      // emito al padre el cambio de valor
      this.cambioValor.emit(this.progreso);
    }
    // paso el foco al input
    this.txtProgress.nativeElement.focus();
  }

  onChangeInput(event : number){
    console.log(event);

    if(event =>0 && event <=100){
      this.progreso = event;
      this.cambioValor.emit(this.progreso);
    }
    
    //si meten un valor invalido
    if(event == null ){

      this.progreso = 0;
      this.cambioValor.emit(this.progreso);

      //let elementHTML = document.getElementsByName("progreso")[0];
      //elementHTML.value = this.progreso;
      this.txtProgress.nativeElement.value = this.progreso;

    }

    //si mete un valor por encima de 100
    if(event > 100){
      console.log("es mayor a 100");
      this.progreso = 100;
      this.cambioValor.emit(this.progreso);
      //let elementHTML = document.getElementsByName("progreso")[0];
      //elementHTML.value = this.progreso;
      this.txtProgress.nativeElement.value = this.progreso;
    }



  }

}

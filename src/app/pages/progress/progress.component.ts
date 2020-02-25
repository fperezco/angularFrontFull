import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1: number = 80;
  progreso2: number = 20;

  constructor() { }

  ngOnInit() {
  }

  /*nombreFuncionPadreQueRecibe( event: number ){
    console.log("evento",event);
    this.progreso2= event;
  }*/

 /* incrementar(){
    if(this.progreso< 100){
      this.progreso = this.progreso + 5;
    }
  }

  decrementar(){
    if(this.progreso > 0){
      this.progreso = this.progreso - 5;
    }
  }*/

}

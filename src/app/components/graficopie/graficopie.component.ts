import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficopie',
  templateUrl: './graficopie.component.html',
  styleUrls: ['./graficopie.component.css']
})
export class GraficopieComponent implements OnInit {

  @Input() contenido;
  labels;
  data;
  type;
  leyenda;

  constructor() { }

  ngOnInit() {
    //console.log("contenido = ",this.contenido);
    this.labels = this.contenido.labels
    this.data = this.contenido.data;
    this.type = this.contenido.type;
    this.leyenda = this.contenido.leyenda;
  }

}

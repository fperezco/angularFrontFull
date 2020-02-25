import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';

  graficos:any = {
    'grafico1' : {
      'labels' : ['pasta', 'puchero', 'hamburguesa'],
      'data': [25,25,50],
      'type': 'pie',
      'leyenda': 'comida favorita'
    },
    'grafico2' : {
      'labels' : ['salmorejo', 'bocata', 'pasta'],
      'data': [75,15,10],
      'type': 'pie',
      'leyenda': 'comida favorita peke'
    },
    'grafico3' : {
      'labels' : ['pienso', 'pollo', 'latitas'],
      'data': [25,5,70],
      'type': 'pie',
      'leyenda': 'gatillo comida'
    },
    'grafico4' : {
      'labels' : ['correr', 'dormir', 'duchar'],
      'data': [25,74,1],
      'type': 'pie',
      'leyenda': 'que hacer al dia'
    },

  }


  constructor() { }

  ngOnInit() {
  }

}

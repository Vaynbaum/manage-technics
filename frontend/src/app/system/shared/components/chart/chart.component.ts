import { Component, Input, OnInit } from '@angular/core';
import { GoogleChart } from '../../models/googleCharts.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  constructor() {}
  @Input()
  //@ts-ignore
  chart: GoogleChart;
  ngOnInit(): void {}
}

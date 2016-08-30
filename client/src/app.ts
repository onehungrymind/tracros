import {Component} from '@angular/core';
import {Foods} from './foods/foods.component';
import {Gauge} from './gauge/gauge.component';
import {Stats} from './stats/stats.component';

@Component({
  selector: 'my-app',
  template: require('./app.html'),
  directives: [Foods, Gauge, Stats]
})

export class App {}

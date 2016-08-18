import {Component} from '@angular/core';
import {Foods} from './foods/foods.component';
import {Guage} from './guage/guage.component';
import {Stats} from './stats/stats.component';

@Component({
  selector: 'my-app',
  template: require('./app.html'),
  directives: [Foods, Guage, Stats]
})

export class App {}

import {Component} from '@angular/core';
import {Foods} from './foods/foods.component';

@Component({
  selector: 'my-app',
  template: require('./app.html'),
  directives: [Foods]
})

export class App {}

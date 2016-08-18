import {Observable} from 'rxjs/Observable';
import {Input, Component} from '@angular/core';
import {Food} from '../foods/food.model';
import {FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/do';
import 'rxjs/core/';

@Component({
  selector: 'guage',
  template: `
    <h5>{{label}}</h5>
    <div class="radial-progress" title="{{percentage}}">
      <div class="circle">
        <div class="mask full">
          <div class="fill"></div>
        </div>
        <div class="mask half">
          <div class="fill"></div>
          <div class="fill fix"></div>
        </div>
        <div class="shadow"></div>
      </div>
      <div class="inset">
        <div class="percentage"></div>
      </div>
    </div>
  `,
    styles: [
      require('./guage.css'),
      `
        h5 {
          text-align: center;
          margin-top: 0;
        }
      `
    ]
})
export class Guage {
    @Input() threshold: number;
    @Input() label: string;
    @Input() foods: FirebaseListObservable<any>;
    percentage: number;
    level: Observable<number>;

    ngOnInit() {
      const field = this.label.toLowerCase();
      this.foods
        .map(foods => foods.map(food => food.protein))
        .sum()
        .do(protein => console.log('PROTEIN', protein))
        .subscribe(() => {
          console.log('done');
        });
    }
}

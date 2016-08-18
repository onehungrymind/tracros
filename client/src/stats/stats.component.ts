import {Component, Input, OnInit} from '@angular/core';
import {Food} from '../foods/food.model';
import {Guage} from '../guage/guage.component';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'stats',
  template: `
    <h3>Stats</h3>
    <div class="mdl-grid">
      <div class="mdl-cell--6-col">
        <guage [foods]="foods" label="Protein" threshold="1000"></guage>
      </div>
      <div class="mdl-cell--6-col">
        <guage [foods]="foods" label="Fat" threshold="1000"></guage>
      </div>
      <div class="mdl-cell--6-col">
        <guage [foods]="foods" label="Carbs" threshold="1000"></guage>
      </div>
      <div class="mdl-cell--6-col">
        <guage [foods]="foods" label="Calories" threshold="1000"></guage>
      </div>
    </div>
  `,
  styles: [`
    .mdl-grid {
      padding: 0;
    }
    [class^='mdl-cell'] {
      margin-bottom: 24px;
    }
  `],
  directives: [Guage]
})
export class Stats {
  foods: FirebaseListObservable<Food[]> = this.af.database.list('foods');

  constructor(private af: AngularFire) {}
}

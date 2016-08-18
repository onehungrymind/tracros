import {Component, Input, OnInit} from '@angular/core';
import {Food} from '../foods/food.model';
import {Guage} from '../guage/guage.component';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {profile} from '../profile/mockProfile';

@Component({
  selector: 'stats',
  template: `
    <h3>Stats</h3>
    <div class="mdl-grid">
      <div class="mdl-cell--6-col" *ngFor="let metric of metrics">
        <guage
          [foods]="foods"
          [label]="metric.name"
          [threshold]="metric.threshold"
        ></guage>
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
  metrics: any[] = profile.metrics;

  constructor(private af: AngularFire) {}
}

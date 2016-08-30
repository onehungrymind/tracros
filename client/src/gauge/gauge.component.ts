import {Input, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/do';

@Component({
  selector: 'gauge',
  template: `
    <h5>{{label}} | <span>{{level | async}}/{{threshold}}</span></h5>
    <div class="radial-progress" title="{{percentage}}">
      <div class="circle" [ngClass]="getClassDefs()">
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
      require('./gauge.css'),
      `
        .radial-progress {
          position: relative;
        }
        .percentage {
          color: #444 !important;
        }
        .warning .fill {
          background-color: #Fff62F !important;
        }
        .danger .fill {
          background-color: #FF8300 !important;
        }
        .failure .fill {
          background-color: #d83030 !important;
        }
        h5 {
          text-align: center;
          margin-top: 0;
        }
        h5 span {
          font-size: 75%;
          color: gray;
          font-weight: 300;
        }
      `
    ]
})
export class Gauge implements OnInit {
    @Input() threshold: number;
    @Input() label: string;
    @Input() foods: FirebaseListObservable<any>;
    percentage: number;
    level: Observable<number>;

    ngOnInit() {
      const field = this.label.toLowerCase();
      this.level = this.foods
        .map(foods => foods.reduce((acc, curr) => {
          return acc + parseInt(curr[field], 10);
        }, 0))
        .do(total => {
          this.percentage = this.calculatePercentage(total, this.threshold)
        });
    }

    calculatePercentage(total, threshold) {
      const percentage = Math.round(total / threshold * 100);
      return percentage <= 100 ? percentage : 100;
    }

    getClassDefs() {
      return {
        success: this.percentage < 50,
        warning: this.percentage >= 50 && this.percentage < 75,
        danger: this.percentage >= 75 && this.percentage < 100,
        failure: this.percentage >= 100
      };
    }
}
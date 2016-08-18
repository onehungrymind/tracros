import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Food} from './food.model';
import {profile} from '../profile/mockProfile';

@Component({
  selector: 'food-detail',
  template: `
  <div class="item-card mdl-card mdl-shadow--2dp">
    <form novalidate (submit)="saved.emit(selectedFood)">
      <div class="mdl-card__supporting-text">
        <div class="mdl-textfield name-field">
          <label>Name</label>
          <input
            [(ngModel)]="selectedFood.name"
            class="mdl-textfield__input" type="text"
          >
        </div>

        <div class="mdl-textfield" *ngFor="let metric of metrics">
          <label [attr.for]="metric.name | lowercase">{{metric.name}}</label>
          <input
            [(ngModel)]="selectedFood[metric.name.toLowerCase()]"
            class="mdl-textfield__input"
            type="text" name="{{metric.name | lowercase}}" id="{{metric.name | lowercase}}"
          >
        </div>
      </div>
      <div class="mdl-card__actions">
        <h2 class="mdl-card__title-text" *ngIf="selectedFood.$key">Editing {{originalName}}</h2>
        <h2 class="mdl-card__title-text" *ngIf="!selectedFood.$key">Create New Item</h2>
        <button type="button" (click)="cancelled.emit(selectedFood)"
          class="mdl-button mdl-js-button mdl-js-ripple-effect">Cancel</button>
        <button type="submit"
          class="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">Save</button>
      </div>
    </form>
  </div>
  `
  ,
  styles: [`
    .mdl-textfield {
      width: 12%;
      padding: 0;
    }
    .name-field {
      width: 45%
    }
    .mdl-card__actions {
      text-align: right;
    }
    .mdl-card__actions h2 {
      float: left;
      padding-left: 8px;
    }
    .mdl-card__supporting-text {
      width: auto;
    }
  `]
})
export class FoodDetail {
  originalName: string;
  selectedFood: Food;
  metrics: any[] = profile.metrics;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set food(value: Food){
    if (value) this.originalName = value.name;
    this.selectedFood = Object.assign({}, value);
  }
}

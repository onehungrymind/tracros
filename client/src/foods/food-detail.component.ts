import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Food} from './food.model';

@Component({
  selector: 'food-detail',
  template: `
  <div class="item-card mdl-card mdl-shadow--2dp">
    <div class="mdl-card__supporting-text">
      <form novalidate>
        <div class="mdl-textfield name-field">
          <label>Name</label>
          <input
            [(ngModel)]="selectedFood.name"
            class="mdl-textfield__input" type="text"
          >
        </div>
        <div class="mdl-textfield">
          <label for="protein">Protein</label>
          <input
            [(ngModel)]="selectedFood.protein"
            class="mdl-textfield__input"
            type="text" name="protein" id="protein"
          >
        </div>
        <div class="mdl-textfield">
          <label for="fat">Fat</label>
          <input
            [(ngModel)]="selectedFood.fat"
            class="mdl-textfield__input"
            type="text" name="fat" id="fat"
          >
        </div>
        <div class="mdl-textfield">
          <label for="carbs">Carbs</label>
          <input
            [(ngModel)]="selectedFood.carbs"
            class="mdl-textfield__input"
            type="text" name="carbs" id="carbs"
          >
        </div>
        <div class="mdl-textfield">
          <label for="calories">Calories</label>
          <input
            [(ngModel)]="selectedFood.calories"
            class="mdl-textfield__input"
            type="text" name="calories" id="calories"
          >
        </div>
      </form>
    </div>
    <div class="mdl-card__actions">
      <h2 class="mdl-card__title-text" *ngIf="selectedFood.$key">Editing {{originalName}}</h2>
      <h2 class="mdl-card__title-text" *ngIf="!selectedFood.$key">Create New Item</h2>
      <button type="button" (click)="cancelled.emit(selectedFood)"
        class="mdl-button mdl-js-button mdl-js-ripple-effect">Cancel</button>
      <button type="submit" (click)="saved.emit(selectedFood)"
        class="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">Save</button>
    </div>
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
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  @Input() set food(value: Food){
    if (value) this.originalName = value.name;
    this.selectedFood = Object.assign({}, value);
  }
}

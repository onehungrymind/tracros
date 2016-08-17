import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Food} from './food.model';

@Component({
  selector: 'foods-list',
  template: `
  <table class="mdl-data-table mdl-shadow--2dp">
    <thead>
      <tr>
        <th class="mdl-data-table__cell--non-numeric">Name</th>
        <th>Protein</th>
        <th>Fat</th>
        <th>Carbs</th>
        <th>Calories</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let food of foods | async" (click)="selected.emit(food)">
        <td class="mdl-data-table__cell--non-numeric">{{food.name}}</td>
        <td>{{food.protein}}</td>
        <td>{{food.fat}}</td>
        <td>{{food.carbs}}</td>
        <td>{{food.calories}}</td>
        <td>
          <button (click)="deleted.emit(food); $event.stopPropagation();"
            class="mdl-button mdl-button--colored mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i class="material-icons">close</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  `,
  styles: [`
    table {
      width: 100%;
    }
  `]
})
export class FoodsList {
  @Input() foods: Food[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}

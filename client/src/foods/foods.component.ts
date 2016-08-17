import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FoodsList} from './foods-list.component';
import {FoodDetail} from './food-detail.component';
import {Food} from './food.model';

@Component({
  selector: 'foods',
  template: `
  <div class="mdl-grid foods">
    <div class="mdl-cell mdl-cell--6-col">
      <h3>Foods</h3>
      <food-detail
        (saved)="saveFood($event)"
        (cancelled)="resetFood($event)"
        [food]="selectedFood"
      >
      </food-detail>
      <hr>
      <foods-list
        [foods]="foods"
        (selected)="selectFood($event)"
        (deleted)="deleteFood($event)"
      >
      </foods-list>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
    </div>
  </div>
  `,
  styles: [`
    .foods {
      padding: 20px;
    }
  `],
  directives: [FoodsList, FoodDetail]
})
export class Foods implements OnInit {
  foods: FirebaseListObservable<Food[]>;
  selectedFood: Food;

  constructor(private af: AngularFire) {}

  ngOnInit() {
    this.foods = this.af.database.list('foods');
  }

  resetFood() {
    let emptyFood: Food = {name: ''};
    this.selectedFood = emptyFood;
  }

  selectFood(food: Food) {
    this.selectedFood = food;
  }

  saveFood(food: Food) {
    const key = food.$key;
    delete food.$key;
    key ? this.foods.update(key, food) : this.foods.push(food);

    // Generally, we would want to wait for the result of `foodsService.saveFood`
    // before resetting the current food.
    this.resetFood();
  }

  deleteFood(food: Food) {
    this.foods.remove(food.$key);

    // Generally, we would want to wait for the result of `foodsService.deleteFood`
    // before resetting the current food.
    this.resetFood();
  }
}

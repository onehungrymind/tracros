import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FoodsList} from './foods-list.component';
import {FoodDetail} from './food-detail.component';
import {Food} from './food.model';
import {profile} from '../profile/mockProfile';

@Component({
  selector: 'foods',
  template: `
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
  `,
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
    profile.metrics.forEach(metric => {
      const metricKey = metric.name.toLowerCase();
      food[metricKey] = food[metricKey] || 0;
    });
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

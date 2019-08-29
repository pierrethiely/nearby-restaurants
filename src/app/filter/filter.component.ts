import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private restaurantService: RestaurantService, private formBuilder: FormBuilder) { }

  filterFormMin: FormGroup;
  filterFormMax: FormGroup;
  currentFilter = 'Aucun filtre appliqué.';

  initFormMin() {
    this.filterFormMin = this.formBuilder.group({
      filter: 0
    });
  }

  initFormMax() {
    this.filterFormMax = this.formBuilder.group({
      filter: 5
    });
  }

  onSubmit() {
    this.restaurantService.tempoRestaurants = [];

    this.restaurantService.filterMin = this.filterFormMin.get('filter').value;
    this.restaurantService.filterMax = this.filterFormMax.get('filter').value;

    if (this.restaurantService.filterMax < this.restaurantService.filterMin) {
      this.restaurantService.filterMin = 0;
      this.restaurantService.filterMax = 5;
      this.currentFilter = 'La note minimum doit être inférieure à la note maximum.';
    } else {
      this.currentFilter = 'Filtre appliqué.';
    }

    this.restaurantService.restaurants.forEach(resto => {
      const test = this.restaurantService.getAllAverageRating(resto);
      if (test <= this.restaurantService.filterMax && test >= this.restaurantService.filterMin) {
        this.restaurantService.tempoRestaurants.push(null);
      }
    });
  }

  initForms() {
    this.initFormMin();
    this.initFormMax();
  }

  ngOnInit() {
    this.initForms();
  }
}

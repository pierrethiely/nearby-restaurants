import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Restaurant } from '../models/restaurant.model';
import { LocationService } from '../services/location.service';
import { Avis } from '../models/avis.model';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {

  constructor(private restaurantService: RestaurantService,
              private locationService: LocationService,
              private formBuilder: FormBuilder) {}

  newRestaurantForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.newRestaurantForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: [this.restaurantService.address, Validators.required],
      stars: ['', Validators.required],
      comment: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit() {
    const restaurantName = this.newRestaurantForm.get('name').value;
    const address = this.restaurantService.address;
    const lat = this.locationService.latNewRestaurant;
    const long = this.locationService.longNewRestaurant;
    const stars = this.newRestaurantForm.get('stars').value;
    const comment = this.newRestaurantForm.get('comment').value;
    const newOpinion = new Avis(+stars, comment);
    const newRestaurant = new Restaurant(restaurantName, address, lat, long);
    newRestaurant.ratings.push(newOpinion);
    this.restaurantService.createNewRestaurant(newRestaurant);
    this.restaurantService.isAdding = false;
  }
}


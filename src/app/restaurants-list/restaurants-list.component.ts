import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Avis } from '../models/avis.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})

export class RestaurantsListComponent implements OnInit {


  constructor(private restaurantService: RestaurantService,
              private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer) {}

  newOpinionForm: FormGroup;
  errorMessage: string;
  displayNoRestaurantFinded = false;

  initForm() {
    this.newOpinionForm = this.formBuilder.group({
      stars: ['', Validators.required],
      comment: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  displayStreetViews(i: number) {
    const url = 'https://www.google.com/maps/embed/v1/streetview?key=YOUR_GOOGLE_API_KEY&location=' +
    this.restaurantService.restaurants[i].lat + ',' + this.restaurantService.restaurants[i].long + '&heading=210&pitch=10&fov=85';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onSubmit(i: number) {
    const stars = this.newOpinionForm.get('stars').value;
    const comment = this.newOpinionForm.get('comment').value;
    const newOpinion = new Avis(+stars, comment);
    this.restaurantService.restaurants[i].ratings.push(newOpinion);
    this.close();
    this.initForm();
  }

  showOpinions(i: number) {
    this.restaurantService.reInitList();
    this.restaurantService.restaurants[i].showOpinions = true;
  }

  showDetails(i: number) {
    this.restaurantService.reInitList();
    this.restaurantService.restaurants[i].showDetails = true;
  }

  addOpinion(i: number) {
    this.restaurantService.reInitList();
    this.restaurantService.restaurants[i].addOpinion = true;
  }

  close() {
    this.restaurantService.reInitList();
  }

  ngOnInit() {
    this.initForm();
  }

}


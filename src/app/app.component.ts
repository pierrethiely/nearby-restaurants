import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { RestaurantService } from './services/restaurant.service';
import { LocationService } from './services/location.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private restaurantService: RestaurantService,
              private locationService: LocationService,
              private http: HttpClient
              ) {}

  lat = 45.7578877;
  lng = 4.8320114;

  mapClicked($event: MouseEvent) {
    if (this.restaurantService.isAdding) {
      return;
    }
    const latlng = ($event.coords.lat + ',' + $event.coords.lng).toString();
    this.getAdress(latlng).subscribe(data => {
      this.restaurantService.address = data.results[0].formatted_address;
      this.restaurantService.reInitList();
      this.restaurantService.isAdding = true;
    });
    this.locationService.latNewRestaurant = $event.coords.lat;
    this.locationService.longNewRestaurant = $event.coords.lng;
  }

  getAdress(latlng: string): Observable<any> {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng
     + '&key=YOUR_GOOGLE_API_KEY');
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.restaurantService.getRestaurantsFromAPI(this.lat, this.lng);
      }, () => {
        this.restaurantService.getRestaurantsFromAPI(this.lat, this.lng);
        alert('Vous n\'avez pas activé la géolocalisation, votre position sera centrée sur Lyon');
      });
    }
  }
}

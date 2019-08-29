import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { Avis } from '../models/avis.model';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  filterMin = 0;
  filterMax = 5;
  address: string;

  isAdding = false;

  comments = [];
  restaurants: Restaurant[] = [];
  tempoRestaurants = [null];
  restaurantsSubject = new Subject<Restaurant[]>();

  emitRestaurants() {
    this.restaurantsSubject.next(this.restaurants);
  }

  createNewRestaurant(newRestaurant: Restaurant) {
    this.restaurants.push(newRestaurant);
    this.emitRestaurants();
  }

  getAllAverageRating(resto: any) {
    const totalRatings = resto.ratings.length;
    let totalStars = 0;
    for (let g = 0; g < totalRatings; g++) {
      totalStars += resto.ratings[g].stars;
    }
    return totalStars / totalRatings;
  }

  getAverageRating(i: number) {
    const totalRatings = this.restaurants[i].ratings.length;
    let totalStars = 0;
    for (let g = 0; g < totalRatings; g++) {
      totalStars += this.restaurants[i].ratings[g].stars;
    }
    return totalStars / totalRatings;
  }

  initComments(i: number) {
    this.reInitList();
    this.comments = [];
    this.restaurants[i].showOpinions = true;
    this.restaurants[i].ratings.forEach(element => {
      if (element.comment !== null) {
        this.comments.push(element.comment);
      }
    });
  }

  reInitList() {
    this.restaurants.forEach(element => {
      element.showDetails = false;
      element.addOpinion = false;
      element.showOpinions = false;
    });
  }

  cancelRestaurant() {
    this.isAdding = false;
  }

  getRestaurantsFromAPI(lat: number, lng: number) {
    const locationCenter = new google.maps.LatLng(lat, lng);
    const map = document.createElement('div');
    const serviceRestaurants = new google.maps.places.PlacesService(map);
    serviceRestaurants.nearbySearch({
      location: locationCenter,
      rankBy: google.maps.places.RankBy.DISTANCE,
      type: 'restaurant',
      keyword: 'restaurant'
    }, (results: any, status: any, pagetoken: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && pagetoken.hasNextPage) {
        pagetoken.nextPage();
      }
      results.forEach(element => {
        const newRestaurant = new Restaurant(element.name, element.vicinity, element.geometry.location.lat(),
        element.geometry.location.lng());

        const request = {
          placeId: element.place_id
        };
        serviceRestaurants.getDetails(request, (place: any, statut: any) => {
          if (statut === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            place.reviews.forEach(comment => {
              const newComment = new Avis(null, comment.text);
              newRestaurant.ratings.push(newComment);
            });
          }
        });
        for (let i = 0; i < element.user_ratings_total; i++) {
          const newOpinion = new Avis(element.rating, null);
          newRestaurant.ratings.push(newOpinion);
        }
        this.createNewRestaurant(newRestaurant);
      });
    });
  }
}

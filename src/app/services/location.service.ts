import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  latNewRestaurant: number;
  longNewRestaurant: number;

  constructor() { }
}

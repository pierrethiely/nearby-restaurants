// Modules
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';

// Services
import { LocationService } from './services/location.service';
import { RestaurantService } from './services/restaurant.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    RestaurantFormComponent,
    RestaurantsListComponent
  ],
  imports: [
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_API_KEY',
      libraries: ['places']
    }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbRatingModule,
    ReactiveFormsModule
  ],
  providers: [
    LocationService,
    RestaurantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

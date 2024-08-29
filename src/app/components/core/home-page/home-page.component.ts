import { Component, inject, OnInit } from '@angular/core';
import { HomeSearchComponent } from './home-search/home-search.component';
import { CitiesService } from '../../../services/cities.service';
import { map } from 'rxjs';
import { TripComponent } from './trip/trip.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeSearchComponent, TripComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  private citiesService = inject(CitiesService);

  ngOnInit(): void {}
}

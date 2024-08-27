import { Component, inject, OnInit } from '@angular/core';
import { HomeSearchComponent } from './home-search/home-search.component';
import { CitiesService } from '../../../services/cities.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeSearchComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  private citiesService = inject(CitiesService);

  ngOnInit(): void {
    this.citiesService.searchCity('paris').subscribe({
      next: (data) => console.log('data', data),
    });
  }
}

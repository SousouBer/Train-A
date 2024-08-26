import { Component } from '@angular/core';
import { HomeSearchComponent } from './home-search/home-search.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeSearchComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}

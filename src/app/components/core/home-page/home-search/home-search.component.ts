import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CitiesService } from '../../../../services/cities.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { CityData } from '../../../../models/models';
import {
  Form,
  TrainTripService,
} from '../../../../services/train-trip.service';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [
    MatInputModule,
    MatIcon,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.css',
  providers: [MatDatepickerModule],
})
export class HomeSearchComponent implements OnInit {
  private citiesService = inject(CitiesService);
  private tripsService = inject(TrainTripService);
  private destroyRef = inject(DestroyRef);

  fromCities = signal<CityData[]>([]);
  toCities = signal<CityData[]>([]);

  searchForm = new FormGroup({
    from: new FormControl('', [Validators.required, Validators.minLength(3)]),
    to: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date: new FormControl('', [Validators.required]),
  });

  get fromCityControl() {
    return this.searchForm.get('from');
  }

  get toCityControl() {
    return this.searchForm.get('to');
  }

  ngOnInit(): void {
    const subscription2 = this.fromCityControl?.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value) => {
          if (this.fromCityControl?.valid) {
            return this.citiesService.searchCity(value as string);
          } else {
            return [];
          }
        })
      )
      .subscribe({
        next: (data) => this.fromCities.set(data),
      });

    const subscription1 = this.toCityControl?.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value) => {
          if (this.toCityControl?.valid) {
            return this.citiesService.searchCity(value as string);
          } else {
            return [];
          }
        })
      )
      .subscribe({
        next: (data) => this.toCities.set(data),
      });

    this.destroyRef.onDestroy(() => {
      subscription1?.unsubscribe();
      subscription2?.unsubscribe();
    });
  }

  displayCity(option: CityData): string {
    return option ? option.city : '';
  }

  onSubmit(): void {
    let selectedFromCity = this.fromCities().find(
      (city) => city.city === this.fromCityControl?.value
    );
    let selectedToCity = this.toCities().find(
      (city) => city.city === this.toCityControl?.value
    );

    this.tripsService
      .tripDetails(selectedFromCity as CityData, selectedToCity as CityData)
      .subscribe({
        next: (data) => console.log(data),
      });
  }
}

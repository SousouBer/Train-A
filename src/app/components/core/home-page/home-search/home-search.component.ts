import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';

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
import { debounceTime, map, Observable, switchMap, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { CityData } from '../../../../models/models';
import {
  Form,
  TrainTripService,
} from '../../../../services/train-trip.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { TripsActions } from '../../../../store/trip/trips.acions';

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
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);
  private citiesService = inject(CitiesService);

  public cities: WritableSignal<CityData[]> = signal<CityData[]>([]);

  searchForm = new FormGroup({
    from: new FormControl(0, [Validators.required, Validators.minLength(3)]),
    to: new FormControl(0, [Validators.required, Validators.minLength(3)]),
    date: new FormControl('', [Validators.required]),
  });

  get fromCityControl() {
    return this.searchForm.get('from');
  }

  get toCityControl() {
    return this.searchForm.get('to');
  }

  get dateControl() {
    return this.searchForm.get('date');
  }

  ngOnInit(): void {
    const subscription = this.citiesService.getCities().subscribe({
      next: (data: CityData[]) => this.cities.set(data),
    });

    this.destroyRef.onDestroy((): void => subscription.unsubscribe());
  }

  displayCity = (id: number): string => {
    const selectedCity = this.cities()?.find((c) => c.id === id);

    return selectedCity?.city as string;
  };

  onSubmit(): void {
    const fromCityId = this.fromCityControl?.value;
    const toCityId = this.toCityControl?.value;
    const date = this.dateControl?.value as string;

    const fromCity = this.cities().find(
      (city) => city.id === fromCityId
    ) as CityData;
    const toCity = this.cities().find(
      (city) => city.id === toCityId
    ) as CityData;

    this.store.dispatch(TripsActions.getTrips({ fromCity, toCity, date }));

    // const subscription = this.tripsService
    //   .tripDetails(fromCity as CityData, toCity as CityData, Number(date))
    //   .subscribe({
    //     next: (data) => console.log(data),
    //   });

    // this.destroyRef.onDestroy((): void => subscription.unsubscribe());
  }
}

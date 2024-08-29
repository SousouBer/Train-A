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

  public cities: WritableSignal<CityData[]> = signal<CityData[]>([]);

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
    console.log(this.searchForm.value);
  }
}

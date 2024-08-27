import { Component, inject, OnInit, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CitiesService } from '../../../../services/cities.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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

  public fromCities$: Observable<string[]> | undefined;
  public toCities$: Observable<string[]> | undefined;

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
    this.fromCities$ = this.fromCityControl?.valueChanges.pipe(
      debounceTime(500),
      switchMap((value) => {
        if (this.fromCityControl?.valid) {
          return this.citiesService.searchCity(value as string);
        } else {
          return [];
        }
      })
    );

    this.toCities$ = this.toCityControl?.valueChanges.pipe(
      debounceTime(500),
      switchMap((value) => {
        if (this.toCityControl?.valid) {
          return this.citiesService.searchCity(value as string);
        } else {
          return [];
        }
      })
    );
  }

  onSubmit(): void {
    console.log(this.searchForm.value);
  }
}

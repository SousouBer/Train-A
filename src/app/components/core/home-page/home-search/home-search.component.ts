import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [
    MatInputModule,
    MatIcon,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.css',
  providers: [MatDatepickerModule],
})
export class HomeSearchComponent {}

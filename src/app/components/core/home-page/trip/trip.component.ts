import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [MatIcon, MatButtonModule],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css',
})
export class TripComponent {}

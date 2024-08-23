import { Component, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ProfileInputComponent } from '../../shared/ui/profile-input/profile-input.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileInputComponent, MatButtonModule, MatIcon],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}

import { Component, inject, OnInit, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ProfileInputComponent } from '../../shared/ui/profile-input/profile-input.component';
import { Observable } from 'rxjs';

import { User } from '../../../models/models';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { selectProfileDetails } from '../../../store/user/user.selectors';
import { loadProfile } from '../../../store/user/user.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileInputComponent, MatButtonModule, MatIcon, AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private store = inject(Store<AppState>);
  public profile$: Observable<User> = this.store.select(selectProfileDetails);

  ngOnInit(): void {
    this.store.dispatch(loadProfile());
  }
}

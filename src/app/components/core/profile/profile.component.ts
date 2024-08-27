import { Component, inject, OnInit, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ProfileInputComponent } from '../../shared/ui/profile-input/profile-input.component';
import { Observable, take } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { User } from '../../../models/models';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import {
  profileStatus,
  selectProfileDetails,
} from '../../../store/user/user.selectors';
import { loadProfile, updatePassword } from '../../../store/user/user.actions';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileInputComponent,
    MatButtonModule,
    MatIcon,
    AsyncPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private store = inject(Store<AppState>);
  dialog = inject(MatDialog);

  profile$: Observable<User | null> = this.store.select(selectProfileDetails);
  profileStatus$ = this.store.select(profileStatus);

  ngOnInit(): void {
    this.store.dispatch(loadProfile());
  }

  onOpenPasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      height: 'auto',
      width: '50%',
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((password: string) => {
        if (password) {
          this.store.dispatch(updatePassword({ password }));
        }
      });
  }
}

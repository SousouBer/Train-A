import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AuthInputComponent } from '../../shared/ui/auth-input/auth-input.component';
import { LayoutsAuthFormComponent } from '../../layouts/layouts-auth-form/layouts-auth-form.component';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../../services/auth.service';

import { SigninData } from '../../../models/models';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    LayoutsAuthFormComponent,
    AuthInputComponent,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  isFetching = false;

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.authService.profile().subscribe({
      next: (val) => {
        console.log('val', val);
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  setControlError(control: string, error: { [value: string]: boolean }) {
    this.signinForm.get(control)?.setErrors(error);
  }

  onSubmit() {
    this.isFetching = true;
    const credentials = this.signinForm.value;

    const subscription = this.authService
      .signin(credentials as SigninData)
      .subscribe({
        next: (res): void => {
          const token = res.token;
          window.localStorage.setItem('token', token);

          this.signinForm.reset();
          // this.router.navigate(['/']);

          this.isFetching = false;
        },
        error: (error: HttpErrorResponse): void => {
          if (error.status === 400) {
            this.setControlError('email', { incorrectCredentials: true });
            this.setControlError('password', { incorrectCredentials: true });
          }
          this.isFetching = false;
        },
      });

    this.destroyRef.onDestroy((): void => subscription.unsubscribe());
  }
}

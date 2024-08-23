import { Component, DestroyRef, inject } from '@angular/core';
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

import SigninData from '../../../models/models';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
export class SigninComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const credentials = this.signinForm.value;

    const subscription = this.authService
      .signin(credentials as SigninData)
      .subscribe({
        next: (res) => {
          const token = res.token;
          window.localStorage.setItem('token', token);

          this.signinForm.reset();
          // this.router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error.reason === 'userNotFound') {
            this.signinForm
              .get('email')
              ?.setErrors({ incorrectCredentials: true });
            this.signinForm
              .get('password')
              ?.setErrors({ incorrectCredentials: true });
          }
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

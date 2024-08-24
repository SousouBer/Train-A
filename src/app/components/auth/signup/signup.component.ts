import { Component, DestroyRef, inject } from '@angular/core';

import { AuthInputComponent } from '../../shared/ui/auth-input/auth-input.component';
import { LayoutsAuthFormComponent } from '../../layouts/layouts-auth-form/layouts-auth-form.component';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { SignupData } from '../../../models/models';
import { AuthService } from '../../../services/auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';

function passwordsMatch(
  control: AbstractControl
): { [s: string]: boolean } | null {
  const password = control.get('password')?.value;
  const passwordConfirmation = control.get('password_confirmation')?.value;

  if (password === passwordConfirmation) {
    return null;
  }

  return { passwordsMismatch: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    AuthInputComponent,
    LayoutsAuthFormComponent,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  signupForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password_confirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    {
      validators: passwordsMatch,
    }
  );

  onSubmit() {
    const credentials = this.signupForm.value;

    const subscription = this.authService
      .signup(credentials as SignupData)
      .subscribe({
        next: () => {
          this.router.navigate(['/signin']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.signupForm.get('email')?.setErrors({ emailIsTaken: true });
          }
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

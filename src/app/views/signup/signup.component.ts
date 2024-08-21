import { Component } from '@angular/core';

import { AuthInputComponent } from '../../auth/ui/auth-input/auth-input.component';
import { LayoutsAuthFormComponent } from '../../layouts/layouts-auth-form/layouts-auth-form.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    AuthInputComponent,
    LayoutsAuthFormComponent,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {}

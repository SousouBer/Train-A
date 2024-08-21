import { Component } from '@angular/core';

import { AuthInputComponent } from '../../auth/ui/auth-input/auth-input.component';
import { LayoutsAuthFormComponent } from '../../layouts/layouts-auth-form/layouts-auth-form.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AuthInputComponent, LayoutsAuthFormComponent, MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {}

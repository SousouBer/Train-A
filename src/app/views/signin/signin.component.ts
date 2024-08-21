import { Component } from '@angular/core';
import { AuthInputComponent } from '../../auth/ui/auth-input/auth-input.component';
import { LayoutsAuthFormComponent } from '../../layouts/layouts-auth-form/layouts-auth-form.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [LayoutsAuthFormComponent, AuthInputComponent, MatButtonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {}

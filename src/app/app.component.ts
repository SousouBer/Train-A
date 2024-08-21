import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SignupComponent } from './views/signup/signup.component';
import { SigninComponent } from './views/signin/signin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignupComponent, SigninComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'train-a';
}

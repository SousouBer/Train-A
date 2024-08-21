import { Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-auth-input',
  standalone: true,
  imports: [MatIconModule, MatInputModule],
  templateUrl: './auth-input.component.html',
  styleUrl: './auth-input.component.css',
})
export class AuthInputComponent {
  label = input.required<string>();
  name = input.required<string>();
  placeholder = input.required<string>();
  inputType = input.required<string>();
  isPassword = input<boolean>(false);

  showPasswordInput = signal<boolean>(false);

  type = computed(() => {
    return this.isPassword()
      ? this.showPasswordInput()
        ? 'text'
        : 'password'
      : this.inputType();
  });

  togglePasswordInput() {
    this.showPasswordInput.set(!this.showPasswordInput());
  }
}

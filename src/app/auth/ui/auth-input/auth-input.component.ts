import { Component, computed, input, signal } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-auth-input',
  standalone: true,
  imports: [MatIconModule, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auth-input.component.html',
  styleUrl: './auth-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AuthInputComponent,
      multi: true,
    },
  ],
})
export class AuthInputComponent implements ControlValueAccessor {
  label = input.required<string>();
  name = input.required<string>();
  placeholder = input.required<string>();
  inputType = input.required<string>();
  isPassword = input<boolean>(false);

  form = input.required<FormGroup>();

  value = '';

  onChange = (value: any) => {};

  onTouched = () => {};

  disabled = false;

  showPasswordInput = signal<boolean>(false);

  type = computed(() => {
    return this.isPassword()
      ? this.showPasswordInput()
        ? 'text'
        : 'password'
      : this.inputType();
  });

  get formControl() {
    return this.form().get(this.name());
  }

  togglePasswordInput() {
    this.showPasswordInput.set(!this.showPasswordInput());
  }

  // Control value accessor configurations.

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    this.onChange(this.value);
    this.onTouched();
  }
}

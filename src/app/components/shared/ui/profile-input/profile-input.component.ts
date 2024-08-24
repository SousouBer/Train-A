import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { updateProfile } from '../../../../store/user/user.actions';

@Component({
  selector: 'app-profile-input',
  standalone: true,
  imports: [MatButtonModule, MatIcon, FormsModule],
  templateUrl: './profile-input.component.html',
  styleUrl: './profile-input.component.css',
})
export class ProfileInputComponent {
  public inputTitle = input.required<string>();
  public inputValue = input.required<string>();

  private store = inject(Store<AppState>);

  value = '';

  public editableField = signal<boolean>(false);

  editField(): void {
    this.editableField.set(true);
  }

  closeEditField(): void {
    this.editableField.set(false);
  }

  updateValue() {
    const updatedData = {
      [this.inputTitle().toLowerCase()]: this.value,
    };
    this.store.dispatch(updateProfile({ data: updatedData }));
  }
}

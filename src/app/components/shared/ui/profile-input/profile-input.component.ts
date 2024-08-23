import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-profile-input',
  standalone: true,
  imports: [MatButtonModule, MatIcon],
  templateUrl: './profile-input.component.html',
  styleUrl: './profile-input.component.css',
})
export class ProfileInputComponent {
  public inputTitle = input.required<string>();
  public inputValue = input.required<string>();

  public editableField = signal<boolean>(false);

  editField(): void {
    this.editableField.set(true);
  }

  closeEditField(): void {
    this.editableField.set(false);
  }
}

import { Component, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatButtonModule, MatIcon],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  public editableField = signal<boolean>(false);

  editField(): void {
    this.editableField.set(true);
  }

  closeEditField(): void {
    this.editableField.set(false);
  }
}

import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-layouts-auth-form',
  standalone: true,
  imports: [MatFormFieldModule],
  templateUrl: './layouts-auth-form.component.html',
  styleUrl: './layouts-auth-form.component.css',
})
export class LayoutsAuthFormComponent {
  @Input({ required: true }) title: string | null = null;
}

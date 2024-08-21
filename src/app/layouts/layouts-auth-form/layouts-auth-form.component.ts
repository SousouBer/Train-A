import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layouts-auth-form',
  standalone: true,
  imports: [],
  templateUrl: './layouts-auth-form.component.html',
  styleUrl: './layouts-auth-form.component.css',
})
export class LayoutsAuthFormComponent {
  @Input({ required: true }) title: string | null = null;
}

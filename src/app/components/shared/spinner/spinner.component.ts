import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `<div class="loader"></div>`,
  styles: `
        .loader {
          margin: 50px auto;
          border: 3px solid blue;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border-right-color: transparent;
          animation: anim 1.5s linear infinite;
        }

        @keyframes anim {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
  `,
})
export class SpinnerComponent {}

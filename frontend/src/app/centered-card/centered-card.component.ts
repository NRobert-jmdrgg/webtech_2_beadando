import { Component } from '@angular/core';

@Component({
  selector: 'app-centered-card',
  template: `
    <div class="div-centered">
      <mat-card><ng-content></ng-content></mat-card>
    </div>
  `,
  styles: [
    `
      .div-centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `,
  ],
})
export class CenteredCardComponent {}

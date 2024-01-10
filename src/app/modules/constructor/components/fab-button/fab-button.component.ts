import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrl: './fab-button.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatIconModule]
})
export class FabButtonComponent {

}

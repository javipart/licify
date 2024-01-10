import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AlertComponent } from './shared/components/alert/alert.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AlertComponent, NavbarComponent, MatCardModule]
})
export class AppComponent {
  title = 'licify';
}

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../../core/service/auth-guard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    CommonModule,
    RouterModule
  ]
})
export class NavbarComponent {
  user: any;
  dashboard: string = '';
  constructor(
    private router: Router,
    private authGuardService: AuthGuardService,
  ) { }

  login() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.authGuardService.user.subscribe(x => {
      this.user = x;
      if (this.user?.type) {
        this.dashboard = `/${this.user.type}`;
      }
    });
  }

  logout(): void {
    this.authGuardService.logout()
  }
}

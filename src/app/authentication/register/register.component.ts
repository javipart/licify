import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { AuthGuardService } from '../../core/service/auth-guard.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertService } from '../../core/service/alert.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  templateUrl: 'register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatProgressBarModule
  ]
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authGuardService: AuthGuardService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authGuardService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      document: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: ['constructor', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  back(): void {

  }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authGuardService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registro Exitoso', true);
          this.router.navigate(['/login'], { queryParams: { registered: true } });
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
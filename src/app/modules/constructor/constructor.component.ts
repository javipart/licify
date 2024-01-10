import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Project } from '../../shared/models/project';
import { AlertService } from '../../core/service/alert.service';
import { AuthGuardService } from '../../core/service/auth-guard.service';
import { Subscription, first } from 'rxjs';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { FabButtonComponent } from './components/fab-button/fab-button.component';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from './services/project.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrl: './constructor.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    ProjectCardComponent,
    FabButtonComponent,
    ProjectModalComponent,
    MatCardModule
  ]
})
export class ConstructorComponent implements OnInit {
  projects: Project[] = [];
  private successSubscription: Subscription = new Subscription();
  constructor(
    private projectService: ProjectService,
    private alertService: AlertService,
    private authGuardService: AuthGuardService,
    public projectModal: MatDialog,
    
  ) { }

  ngOnInit(): void {
    const id = this.authGuardService.userValue?.id;
    this.successSubscription = this.projectService.successSubject$.subscribe(() => {
      if (id) {
        this.loadProjects(id);
      }
    });
    if (id) {
      this.loadProjects(id);
    }
  }

  ngOnDestroy(): void {
    this.successSubscription.unsubscribe();
  }

  private loadProjects(id: string): void {
    this.projectService.getProjects(id).subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: error => {
        this.alertService.error(error);
      }
    });

  }

  opendProjectModal(): void {
    const dialogRef = this.projectModal.open(ProjectModalComponent, {
      data: { type: 'create' },
    });
  }
}

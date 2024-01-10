import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProjectService } from './services/project.service';
import { Subscription } from 'rxjs';
import { Project } from '../../shared/models/project';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { AuthGuardService } from '../../core/service/auth-guard.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    ProjectsTableComponent,
    MatProgressBarModule
  ]
})
export class ProviderComponent {
  id: string = '';
  loading: boolean = false;
  projects: Project[] = [];
  private successSubscription: Subscription = new Subscription();
  panel = 0;
  constructor(
    private projectService: ProjectService,
    public projectModal: MatDialog,
    private authGuardService: AuthGuardService,
  ) { }

  setPanel(index: number): void {
    this.panel = index;
    this.loadProjects(this.id);
  }

  ngOnInit(): void {
    this.id = this.authGuardService.userValue?.id || '';
    this.successSubscription = this.projectService.successSubject$.subscribe(() => {
      if (this.id) {
        this.loadProjects(this.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.successSubscription.unsubscribe();
  }

  private loadProjects(id: string): void {
    this.loading = true;
    switch (this.panel) {
      case 0:
        this.projectService.getNewProjects(id).subscribe(data => {
          this.loading = false;
          this.projects = data;
        });
        break;
      case 1:
        this.projectService.getAppliedProjects(id).subscribe(data => {
          this.loading = false;
          this.projects = data;
        });
        break;
      default:
        this.projectService.getAssignedProjects(id).subscribe(data => {
          this.loading = false;
          this.projects = data;
        });
        break;
    }
  }
}

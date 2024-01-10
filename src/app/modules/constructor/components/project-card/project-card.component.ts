import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { ProjectService } from '../../services/project.service';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../../core/service/alert.service';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, CommonModule, MatTooltipModule]
})
export class ProjectCardComponent {
  @Input() project: any;

  constructor(
    private projectModal: MatDialog,
    private projectSerice: ProjectService,
    private alertService: AlertService,
  ) { }

  opendProjectModal(type: string): void {
    const dialogRef = this.projectModal.open(ProjectModalComponent, {
      data: { type, project: this.project },
    });
  }

  changeStatus(): void {
    this.projectSerice.updateProject(this.project._id, { status: !this.project.status })
      .subscribe({
        next: (data) => {
          this.project = data;
        },
        error: error => {
          this.alertService.error(error);
        }
      });

  }
}

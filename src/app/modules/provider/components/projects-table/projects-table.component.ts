import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../../../shared/models/project';

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ProjectsTableComponent {
  @Input() projects: any;
  displayedColumns: string[] = ['name', 'builder', 'dates', 'actions'];

  constructor(
    public projectModal: MatDialog,
  ) {}

  ngOnInit(): void {
  }

  viewProject(project: Project): void {
    console.log(project)
    const dialogRef = this.projectModal.open(ProjectModalComponent, {
      width: '500px',
      data: { project: project }
    });
  }
}

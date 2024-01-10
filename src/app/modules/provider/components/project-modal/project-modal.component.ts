import { Component, Inject, importProvidersFrom } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { Item } from '../../../../shared/models/items';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../services/project.service';
import { PropousalModalComponent } from '../propousal-modal/propousal-modal.component';
import { PropousalService } from '../../services/propousal.service';
import { AuthGuardService } from '../../../../core/service/auth-guard.service';

interface Propousal {
  project: string,
  provider: string,
  items: Item,
}

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogContent,
    CommonModule,
    MatDialogClose,
    MatTableModule,
    MatIconModule,
  ]
})
export class ProjectModalComponent {
  items: any = {};
  username: string = '';
  addingNewItem: boolean = false;
  displayedColumns: string[] = ['item', 'value', 'actions'];
  constructor(
    public dialogRef: MatDialogRef<ProjectModalComponent>,
    public propousalModal: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any | null,
    private fb: FormBuilder,
    private propousalService: PropousalService,
    private authGuardService: AuthGuardService,
  ) {
    if (data.project.items) {
      this.items = data.project.items;
    }
    this.username = this.authGuardService.userValue?.username || '';
  }

  onClose(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    const id = this.authGuardService.userValue?.id || '';
    const newItems: Item = {};
    this.items.forEach((element: Item) => {
      newItems[element['item']] = element[this.username];
    });
    const data: Propousal = { project: this.data.project._id, provider: id, items: newItems };
    this.propousalService.savePropousal(data).subscribe(() => {

    });
    this.dialogRef.close();
  }

  addItem(): void {
    this.addingNewItem = true;
  }

  saveItem(): void {

  }

  addItemPropousal(item: Item): void {
    const dialogRef = this.propousalModal.open(PropousalModalComponent, {
      disableClose: true,
      data: { item: item, username: this.username }
    });
    dialogRef.afterClosed().subscribe(result => {
      let newItems = JSON.parse(JSON.stringify(this.items));
      const newItem = newItems.find((nI: Item) => nI['item'] === item['item']);
      newItems = newItems.filter((nI: Item) => nI['item'] !== item['item']);
      newItem[this.username] = result;
      newItems.push(newItem);
      this.items = newItems;
    });
  }
}

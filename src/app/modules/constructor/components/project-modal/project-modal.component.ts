import { Component, Inject, importProvidersFrom } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { Item } from '../../../../shared/models/items';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../services/project.service';
import { MatSelectModule } from '@angular/material/select';
import { Provider } from '../../../../shared/models/provider';
import { Propousal } from '../../../../shared/models/propousal';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { AlertService } from '../../../../core/service/alert.service';
import { AuthGuardService } from '../../../../core/service/auth-guard.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogContent,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogClose,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    ItemModalComponent
  ]
})
export class ProjectModalComponent {
  range = new FormGroup({
    initialDate: new FormControl<Date | null>(null),
    finalDate: new FormControl<Date | null>(null),
  })
  projectForm: FormGroup;
  newItemForm: FormGroup;
  providers: Provider[] = [];
  items: Item[] = [];
  addingNewItem: boolean = false;
  displayedColumns: string[] = ['actions', 'item', 'value'];
  selectedProviderId: string = '';
  constructor(
    public dialogRef: MatDialogRef<ProjectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any | null,
    private fb: FormBuilder,
    private alertService: AlertService,
    private projectSerice: ProjectService,
    private authGuardService: AuthGuardService,
    private itemModal: MatDialog,
  ) {
    this.newItemForm = this.fb.group({
      item: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      value: [0],
    });
    this.projectForm = this.fb.group({
      name: [''],
    });
    if (data && data.project) {
      this.projectForm.patchValue({
        name: data.project.name,
      });
      if (data.project.initialDate) {
        this.range.get('initialDate')?.setValue(new Date(data.project.initialDate));
      }
      if (data.project.finalDate) {
        this.range.get('finalDate')?.setValue(new Date(data.project.finalDate));
      }
      this.items = data.project.items;
      if (this.items.length > 0) {
        this.displayedColumns = Object.keys(this.items[0]);
        this.displayedColumns.unshift('actions')
      }

      if (data.type === 'view') {
        this.range.get('initialDate')?.disable();
        this.range.get('finalDate')?.disable();
        this.projectForm.get('name')?.disable();
      }
      if (data.project.provider) {
        this.selectedProviderId = data.project.provider;
      }
      if (data.project.propousals) {
        data.project.propousals.forEach((element: Propousal) => {
          this.providers.push(element.provider);
        });
      }
    }
  }

  get f() { return this.newItemForm.controls; }

  onClose(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    const name = this.projectForm.get('name')?.value;
    const initialDate = this.range.get('initialDate')?.value;
    const finalDate = this.range.get('finalDate')?.value;
    const builder = this.authGuardService.userValue?.id;
    if (!this.data.project) {
      this.projectSerice.createProject({ name, initialDate, finalDate, items: this.items, builder })
        .subscribe({
          next: () => {
            this.range.reset();
            this.projectForm.reset();
            this.items = [];
          },
          error: error => {
            this.alertService.error(error);
          }
        });
    } else {
      this.projectSerice.updateProject(this.data.project._id, { name, initialDate, finalDate, items: this.items, provider: this.selectedProviderId })
        .subscribe({
          next: () => {
            this.range.reset();
            this.projectForm.reset();
            this.items = [];
          },
          error: error => {
            this.alertService.error(error);
          }
        });
    }
    this.dialogRef.close();
  }

  addItem(): void {
    this.addingNewItem = true;
  }

  saveItem(): void {
    const newItem: Item = {
      item: this.newItemForm.get('item')?.value,
      value: this.newItemForm.get('value')?.value,
    }
    const newItems = JSON.parse(JSON.stringify(this.items))
    newItems.push(newItem)
    this.items = newItems;
    this.addingNewItem = false;
    this.newItemForm.reset();
  }

  deleteItem(item: Item): void {
    let newItems = JSON.parse(JSON.stringify(this.items))
    newItems = newItems.filter((itm: Item) => itm['item'] !== item['item'])
    this.items = newItems;
  }

  editItem(item: Item): void {
    const dialogRef = this.itemModal.open(ItemModalComponent, {
      disableClose: true,
      data: { item: item }
    });
    dialogRef.afterClosed().subscribe(result => {
      let newItems = JSON.parse(JSON.stringify(this.items));
      const newItem = newItems.find((nI: Item) => nI['item'] === item['item']);
      newItems = newItems.filter((nI: Item) => nI['item'] !== item['item']);
      newItem[item['item']] = result;
      newItems.push(newItem);
      this.items = newItems;
    });
  }
}

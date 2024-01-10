import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-propousal-modal',
  templateUrl: './propousal-modal.component.html',
  styleUrl: './propousal-modal.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ]
})
export class PropousalModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PropousalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}

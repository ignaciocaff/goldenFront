
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css'],
  })
  export class ConfirmationDialog {
    constructor(public dialogRef: MatDialogRef<ConfirmationDialog>) {}
  
    public confirmMessage:string;
  }
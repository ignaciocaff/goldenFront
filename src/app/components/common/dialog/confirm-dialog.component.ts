
import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    template: `
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <button type="button" md-raised-button class="btn btn-primary"
            (click)="dialogRef.close(true)">OK</button>
        <button type="button" md-button 
            (click)="dialogRef.close(false)">Cancel</button>`
})
export class ConfirmDialogComponent {

    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
        
    }
}
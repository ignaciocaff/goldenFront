import { Observable } from 'rxjs/Rx';
import { ConfirmDialogComponent } from '../../components/common/dialog/index';
import { LocalidadesCargaComponent } from '../../components/common/localidades/index';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import {
    Provincia,
} from '../../entities/index';


@Injectable()
export class DialogService {

    constructor(private dialog: MatDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {
        let confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

        confirmDialogRef = this.dialog.open(ConfirmDialogComponent);
        confirmDialogRef.componentInstance.title = title;
        confirmDialogRef.componentInstance.message = message;

        return confirmDialogRef.afterClosed();
    }

    public agregarLocalidad(provincia: Provincia): Observable<boolean> {
        let localidadesCargaRef: MatDialogRef<LocalidadesCargaComponent>;

        localidadesCargaRef = this.dialog.open(LocalidadesCargaComponent, {
            width: '50%',
            data: provincia
        });

        return localidadesCargaRef.afterClosed();
    }
}
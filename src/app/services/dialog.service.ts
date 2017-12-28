import { Observable } from 'rxjs/Rx';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { Injectable, Component } from '@angular/core';
import { LoginCargaComponent } from '../components/common/login/index'

@Component({
    moduleId: module.id,
    styleUrls: ['./dialog.service.css'],
    providers: []
})

@Injectable()
export class DialogService {

    constructor(private dialog: MatDialog) { }

    public loginDialog(): Observable<boolean> {

        let loginRef: MatDialogRef<LoginCargaComponent>;

        loginRef = this.dialog.open(LoginCargaComponent, {
            disableClose: true,
            width: '30%',
        });
        loginRef.updatePosition({ top: '5px', left: '500px' });

        return loginRef.afterClosed();
    }
}
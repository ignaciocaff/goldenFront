
import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Equipo, Fecha, Sancion, TipoSancion, IPartido } from '../../../entities/index';

@Component({
    selector: 'sancion-dialog-v',
    templateUrl: './sancion-dialog-v.html',
    styleUrls: ['./sancion-dialog-v.css']
})
export class SancionDialogV implements OnInit {

    lsFechasInicio = new Array<Fecha>();
    lsFechasFin = new Array<Fecha>();
    conjunto = new Array<any>();
    sancion = new Sancion();
    lsTiposSancion = new TipoSancion();
    esOtras: boolean;
    partido = new IPartido();

    constructor(public dialogRef: MatDialogRef<SancionDialogV>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.conjunto = data;

    }

    ngOnInit() {
        this.esOtras = false;
        this.sancion = this.conjunto[0];
        this.lsFechasInicio = this.conjunto[1];
        this.lsFechasFin = this.conjunto[2];
        this.lsTiposSancion = this.conjunto[3];
        this.partido = this.conjunto[4];
    }

    registrarSancion() {
        this.partido.lsSancionesVisitante.push(this.sancion);
        this.dialogRef.close({ data: this.partido });
    }

    onChange(tipo: TipoSancion) {
        if (tipo.descripcion == 'Otras' || tipo.id_tipo == 7) {
            this.esOtras = true;
        } else {
            this.esOtras = false;
        }
    }

}
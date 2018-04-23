
import { Component, Input, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Equipo, Fecha, Sancion, TipoSancion, IPartido } from '../../../entities/index';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
    selector: 'sancion-dialog',
    templateUrl: './sancion-dialog.html',
    styleUrls: ['./sancion-dialog.css']
})
export class SancionDialog implements OnInit {
    @ViewChild('sancionForm') sancionForm: FormGroup;
    lsFechasInicio = new Array<Fecha>();
    lsFechasFin = new Array<Fecha>();
    conjunto = new Array<any>();
    sancion = new Sancion();
    lsTiposSancion = new Array<TipoSancion>();
    esOtras: boolean;
    partido = new IPartido();

    constructor(public dialogRef: MatDialogRef<SancionDialog>,
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
        this.partido.lsSancionesLocal.push(this.sancion);
        this.dialogRef.close({ data: this.partido });
    }

    onChange(tipo_sancion: TipoSancion) {
        if (tipo_sancion.descripcion == 'Otras' || tipo_sancion.id_tipo == 7) {
            this.esOtras = true;
        } else {
            this.esOtras = false;
        }
    }

}
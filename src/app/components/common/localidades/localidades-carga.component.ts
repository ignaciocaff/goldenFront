import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
    Localidad,
    Provincia
} from '../../../entities/index';

import {
    ProvinciaService,
    LocalidadService,
} from '../../../services/entity-services/index';

@Component({
    moduleId: module.id,
    selector: 'localidades-carga',
    templateUrl: './localidades-carga.component.html',
    providers: [
        ProvinciaService,
        LocalidadService
    ]
})
export class LocalidadesCargaComponent implements OnInit {
    lsProvincias = new Array<Provincia>();
    localidad: Localidad;

    constructor(
        public dialogRef: MatDialogRef<LocalidadesCargaComponent>,
        private provinciaService: ProvinciaService,
        private localidadService: LocalidadService,
        public toastr: ToastsManager,
        @Inject(MAT_DIALOG_DATA) public data: Provincia
    ) {

    }

    ngOnInit() {
        this.localidad = new Localidad();
        this.localidad.provincia = this.data;
    }

    registrarLocalidad() {
        this.localidadService.create(this.localidad).subscribe(
            data => {
                this.dialogRef.close(true)
                this.toastr.success("La localidad fue creada correctamente", "Exito!");
            },
            error => {
                this.toastr.error("El nombre de esa localidad ya existe", "Error!");
            });
    }
}
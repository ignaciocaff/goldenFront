import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
    Localidad,
    Provincia
} from '../../../entities/index';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


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

    public provincia: Provincia;
    public localidad: Localidad = new Localidad();

    constructor(
        public dialogRef: MatDialogRef<LocalidadesCargaComponent>,
        private provinciaService: ProvinciaService,
        private localidadService: LocalidadService,
        public toastr: ToastsManager,
        private spinnerService: Ng4LoadingSpinnerService,
        @Inject(MAT_DIALOG_DATA) public data: Provincia
    ) {

    }

    ngOnInit() {
        this.provincia = this.data;
    }

    registrarLocalidad() {
        this.spinnerService.show();
        this.localidadService.create(this.provincia.id_provincia, this.localidad).subscribe(
            data => {
                this.spinnerService.hide();
                this.dialogRef.close(true)
                this.toastr.success("La localidad fue creada correctamente.", "Exito!");
            },
            error => {
                this.spinnerService.hide();
                this.toastr.error("El nombre de esa localidad ya existe.", "Error!");
            });
    }
}
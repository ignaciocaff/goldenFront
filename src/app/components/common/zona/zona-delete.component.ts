import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FileService } from '../../../services/entity-services/file.service';
import { Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo, Zona, IEquipo } from '../../../entities/index';
import { EquipoService, ZonaService } from '../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialog } from '../../common/dialog/index';

@Component({
    selector: 'zona',
    moduleId: module.id,
    templateUrl: './zona-delete.component.html',
    styleUrls: ['./zona-delete.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [EquipoService, ZonaService]
})
export class ZonaDeleteComponent implements OnInit {

    dialogRef: MatDialogRef<ConfirmationDialog>;
    equipos = new Array<IEquipo>();
    zonas = new Array<Zona>();
    lsZonas = new Array<Zona>();

    imagesEscudos: Array<any> = [];
    cantidadZonas: number;
    id_torneo: number;

    constructor(private fileService: FileService, public equipoService: EquipoService,
        private router: Router, public zonaService: ZonaService, public toastr: ToastsManager, public dialog: MatDialog) {
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
    }

    ngOnInit() {
        this.zonaService.getAll(this.id_torneo).subscribe(
            data => {
                this.lsZonas = [];
                for (var i = 0; i < data.length; i++) {
                    let zona: Zona;
                    zona = data[i];
                    if (zona.torneo.id_torneo != null) {
                        this.lsZonas.push(zona);
                    }
                }
            }, error => {

            }
        );

    }
    droppableItemClass = (item: any) => `${item.class} ${item.inputType}`;

    builderDrag(e: any) {
        const item = e.value;
        item.data = item.inputType === 'number' ?
            (Math.random() * 100) | 0 :
            Math.random().toString(36).substring(20);
    }


    canMove(e: any): boolean {
        return e.indexOf('Disabled') === -1;
    }

    zona(lsEquipos: any) {
    }

    limpiarCampos() {
        this.zonas = [];
        this.cantidadZonas = null;
        this.equipos = [];
        this.ngOnInit();
    }

    routeAlta() {
        this.router.navigate(['home/zona-carga']);
    }

    routeModificacion() {
        this.router.navigate(['home/zona-update']);
    }

    routeEliminar() {
        this.router.navigate(['home/zona-delete']);
    }

    borrarZona() {
        this.openConfirmationDialog(this.zona);

    }

    openConfirmationDialog(newValue) {
        this.dialogRef = this.dialog.open(ConfirmationDialog, {
            height: '200px',
            width: '300px',
            disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = "Se desvincularan todos los equipos."

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.zonaService.delete(newValue).subscribe(
                    data => {
                        if (data) {
                            this.toastr.success('Se borro correctamente la zona y desvincunlaron los equipos', 'Éxito!')
                            this.limpiarCampos();
                        }
                    }, error => {

                    }
                );
            }
            this.dialogRef = null;
        });
    }
}
import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { SancionEquipo, Equipo, Torneo } from '../../../entities/index';
import { SancionEquipoService, EquipoService } from '../../../services/entity-services/index';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmationDialog } from '../../common/dialog/index';
import { DataSource } from '@angular/cdk/table';


@Component({
    selector: 'sanciones-equipo-baja',
    moduleId: module.id,
    templateUrl: './sanciones-equipo-baja.component.html',
    styleUrls: ['./sanciones-equipo-baja.component.css'],
    providers: []
})
export class SancionEquipoBajaComponent implements OnInit {
    @ViewChild('sancionesEquipoForm') reglaForm: FormGroup;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public sancion = new SancionEquipo();
    public lsEquipos = new Array<Equipo>();
    public lsSanciones = new Array<SancionEquipo>();
    dataSource = new MatTableDataSource<SancionEquipo>();
    public tieneSanciones: boolean = false;

    dialogRef: MatDialogRef<ConfirmationDialog>;
    displayedColumns = ['descripcion_sancion', 'puntos_restados'];

    constructor(
        public toastr: ToastsManager,
        private router: Router,
        private equipoService: EquipoService,
        private sancionEquipoService: SancionEquipoService,
        private spinnerService: Ng4LoadingSpinnerService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.equipoService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let equipo = new Equipo();
                    equipo = data[i];
                    if (equipo.torneo.id_torneo != null && equipo.torneo.id_torneo == JSON.parse(sessionStorage.getItem('id_torneo'))) {
                        this.lsEquipos.push(equipo);
                    }
                }
            },
            error => {
                this.lsEquipos = new Array<Equipo>();
                error.json()['Message'];
            });

        var id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.sancion.torneo = new Torneo();
        this.sancion.torneo.id_torneo = id_torneo;
    }

    onChange(id_equipo: number) {
        /*         let equipo: Equipo = newValue;
                this.sancion.equipo = equipo; */
        console.log(id_equipo);
        this.sancionEquipoService.getSancionesByEquipo(id_equipo).subscribe(
            data => {
                console.log("entro a data");
                if (data) {
                    this.dataSource = null;
                    this.lsSanciones = [];
                    for (let i = 0; i < data.length; i++) {
                        var sancion = new SancionEquipo();
                        sancion = data[i];
                        this.lsSanciones.push(sancion);
                    }
                    this.dataSource = new MatTableDataSource(this.lsSanciones);
                    this.tieneSanciones = true;
                }
            },
            error => {
                console.log("errorertetere");
                error.json()['Message'];
            });
    }

    eliminarSancion(id_sancion: number) {
        this.dialogRef = this.dialog.open(ConfirmationDialog, {
            height: '200px',
            width: '350px',
            disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = "Se eliminará la sanción de este equipo."

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.spinnerService.show();
                this.sancionEquipoService.delete(id_sancion).subscribe(
                    data => {
                        this.spinnerService.hide();
                        this.toastr.success('La sanción se ha eliminado con éxito.', 'Exito!');
                        this.limpiar();
                    },
                    error => {
                        this.spinnerService.hide();
                        this.toastr.error('La sanción no se ha eliminado.", "Error!');
                    });
            }
            this.dialogRef = null;
        });
    }

    routeAlta() {
        this.router.navigate(['home/configuraciones/sanciones-equipo-carga']);
    }

    routeModificacion() {
        this.router.navigate(['home/configuraciones/sanciones-equipo-baja']);
    }

    limpiar() {
        this.sancion = new SancionEquipo();
        this.lsEquipos = [];
        this.lsSanciones = [];
        this.dataSource = null;

        this.equipoService.getAll().subscribe(
            data => {
                for (let i = 0; i < data.length; i++) {
                    let equipo = new Equipo();
                    equipo = data[i];
                    if (equipo.torneo.id_torneo != null && equipo.torneo.id_torneo == JSON.parse(sessionStorage.getItem('id_torneo'))) {
                        this.lsEquipos.push(equipo);
                    }
                }
            },
            error => {
                this.lsEquipos = new Array<Equipo>();
                error.json()['Message'];
            });

        var id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.sancion.torneo = new Torneo();
        this.sancion.torneo.id_torneo = id_torneo;
    }
}

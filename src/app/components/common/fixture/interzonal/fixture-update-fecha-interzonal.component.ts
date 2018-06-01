import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FileService } from '../../../../services/entity-services/file.service';
import { ParserService } from '../../../../services/common-services/index';
import {
    Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo, Zona, Fixture, Fecha, Cancha, HorarioFijo,
    Turno, IEquipo, IPartido, Partido
} from '../../../../entities/index';
import { EquipoService, ZonaService, HorarioService, CanchaService, FixtureService } from '../../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FixtureDialog } from '../index';
import { ConfirmationDialog } from '../../../common/dialog/index';



@Component({
    selector: 'fixture-update-fecha-interzonal',
    moduleId: module.id,
    templateUrl: './fixture-update-fecha-interzonal.component.html',
    styleUrls: ['./fixture-update-fecha-interzonal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [EquipoService, ZonaService]
})
export class FixtureUpdateFechaInterzonalComponent implements OnInit {
    dialogRef: MatDialogRef<FixtureDialog>;
    dialogRefBorrado: MatDialogRef<ConfirmationDialog>;

    lsFechas = new Array<Fecha>();
    zona = new Zona();
    lsZonas = new Array<Zona>();
    fixture = new Fixture();
    id_torneo: number;
    fecha = new Fecha();
    nuevaFecha = new Date();
    id_fecha_cambiar: number;
    habilitarBoton: Boolean = false;

    constructor(private fileService: FileService, public equipoService: EquipoService,
        private router: Router, public zonaService: ZonaService, public toastr: ToastsManager,
        public horarioService: HorarioService, public canchaService: CanchaService, public parserService: ParserService,
        public fixtureService: FixtureService, public dialog: MatDialog) {
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));

    }
    ngOnInit() {
        this.fechas();
    }

    fechas() {
        this.fixtureService.obtenerFechasInterzonales(this.id_torneo).subscribe(
            data => {
                this.lsFechas = [];
                this.lsFechas = data;

                for (let i = this.lsFechas.length - 1; i >= 0; i--) {
                    for (let j = 0; j < this.lsFechas.length; j++) {
                        if (this.lsFechas[i].fecha == this.lsFechas[j].fecha
                            && this.lsFechas[i].id_fecha != this.lsFechas[j].id_fecha) {
                            this.lsFechas.splice(i, 1);
                            break;
                        }
                    }
                }
            }, error => {
                this.lsFechas = [];
            }

        );
    }

    modificarFecha() {
        this.fixtureService.modificarFechaInterzonal(this.id_torneo, this.nuevaFecha, this.fecha).subscribe(
            data => {
                this.toastr.success('Se modificó correctamente la fecha', 'Éxito!');
                this.limpiarCampos();
            }, error => {
                this.toastr.error('Intente nuevamente más tarde.', 'Error!');
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

    public compararHorariosBack(partido: IPartido) {
        this.fixtureService.obtenerPartidosClub(partido).subscribe(
            data => {
                var partido = new IPartido();
                partido = data;
                if (partido.id_partido > 0) {
                    this.openConfirmationDialog(partido);
                }
            },
            error => {
                this.toastr.error('Intente nuevamente más tarde.', 'Error!');
            }
        )
    }

    openConfirmationDialog(newValue) {
        this.dialogRef = this.dialog.open(FixtureDialog, {
            data: newValue,
            height: '60%',
            width: '65%',
            disableClose: false,

        });

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
            this.dialogRef = null;
        });
    }

    limpiarCampos() {

        this.ngOnInit();
    }


    routeAlta() {
        this.router.navigate(['home/fixture-armado']);
    }

    routeModificacion() {
        this.router.navigate(['home/fixture-update']);
    }

    routeCambioFecha() {
        this.router.navigate(['home/fixture-update-fecha']);
    }

    routeInterzonal() {
        this.router.navigate(['home/fixture-interzonal']);
    }

    routeCambioFechaInterzonal() {
        this.router.navigate(['home/fixture-interzonal-fecha']);
    }
}
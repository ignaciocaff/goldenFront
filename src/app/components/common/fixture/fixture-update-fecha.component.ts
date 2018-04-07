import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FileService } from '../../../services/entity-services/file.service';
import { ParserService } from '../../../services/common-services/index';
import {
    Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo, Zona, Fixture, Fecha, Cancha, HorarioFijo,
    Turno, IEquipo, IPartido, Partido
} from '../../../entities/index';
import { EquipoService, ZonaService, HorarioService, CanchaService, FixtureService } from '../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import * as moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FixtureDialog } from './index';
import { ConfirmationDialog } from '../../common/dialog/index';



@Component({
    selector: 'fixture-update-fecha',
    moduleId: module.id,
    templateUrl: './fixture-update-fecha.component.html',
    styleUrls: ['./fixture-update-fecha.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [EquipoService, ZonaService]
})
export class FixtureUpdateFechaComponent implements OnInit {
    dialogRef: MatDialogRef<FixtureDialog>;
    dialogRefBorrado: MatDialogRef<ConfirmationDialog>;

    lsFechas = new Array<Fecha>();
    zona = new Zona();
    lsZonas = new Array<Zona>();
    fixture = new Fixture();
    id_torneo: number;
    nuevaFecha = new Fecha();
    id_fecha_cambiar: number;
    habilitarBoton: Boolean = false;

    constructor(private fileService: FileService, public equipoService: EquipoService,
        private router: Router, public zonaService: ZonaService, public toastr: ToastsManager,
        public horarioService: HorarioService, public canchaService: CanchaService, public parserService: ParserService,
        public fixtureService: FixtureService, public dialog: MatDialog) {
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));

    }
    ngOnInit() {
        this.fixture.fechas = [];
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

    fechasPorZona(zona: Zona) {
        this.fixtureService.obtenerFechas(this.zona.id_zona, this.id_torneo).subscribe(
            data => {
                this.lsFechas = [];
                this.fixture = data;
                this.lsFechas = this.fixture.fechas;

                for (var i = 0; i < this.fixture.fechas.length; i++) {

                }
            }, error => {
                this.lsFechas = [];
            }

        );
    }

    cambioFecha(obj: any) {
        this.nuevaFecha = obj;
    }

    comparacionFechasFixture(obj: Date) {
        let contador: number = 0;
        var datePipe = new DatePipe('en-US');
        this.habilitarBoton = false;
        for (var i = 0; i < this.fixture.fechas.length; i++) {
            var fPipe = datePipe.transform(this.fixture.fechas[i].fecha, 'yyyy-MM-dd');
            if (fPipe == obj.toString()) {
                contador = contador + 1;
                this.toastr.error("Fecha ocupada para esa zona.", "Error!");
            }
        }

        if (contador == 0) {
            this.nuevaFecha.fecha = obj;
            this.habilitarBoton = true;
        }

    }


    modificarFecha() {
        for (var i = 0; i < this.fixture.fechas.length; i++) {
            if (this.fixture.fechas[i].id_fecha == this.nuevaFecha.id_fecha) {
                this.fixture.fechas[i] = this.nuevaFecha;
            }
        }

        this.fixtureService.modificarFecha(this.fixture).subscribe(
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
}
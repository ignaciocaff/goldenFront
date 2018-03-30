import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FileService } from '../../../services/entity-services/file.service';
import { ParserService } from '../../../services/common-services/index';
import {
    Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo, Zona, Fixture, Fecha, Cancha, HorarioFijo,
    Turno, IEquipo, IPartido, Partido
} from '../../../entities/index';
import { EquipoService, ZonaService, HorarioService, CanchaService, FixtureService } from '../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'fixture',
    moduleId: module.id,
    templateUrl: './fixture.component.html',
    styleUrls: ['./fixture.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [EquipoService, ZonaService]
})
export class FixtureComponent implements OnInit {

    fecha = new Fecha();
    zona = new Zona();
    partidos = new Array<IPartido>();
    lsCanchas = new Array<Cancha>();
    horarios = new Array<HorarioFijo>();

    equipos = new Array<IEquipo>();
    lsZonas = new Array<Zona>();

    cantidadPartidos: number;
    imagesEscudos: Array<any> = [];
    cantidadZonas: number;
    id_torneo: number;

    constructor(private fileService: FileService, public equipoService: EquipoService,
        private router: Router, public zonaService: ZonaService, public toastr: ToastsManager,
        public horarioService: HorarioService, public canchaService: CanchaService, public parserService: ParserService,
        public fixtureService: FixtureService) {
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

        this.horarioService.getAll().subscribe(
            data => {
                this.horarios = [];
                for (let i = 0; i < data.length; i++) {
                    var horario = new HorarioFijo();
                    horario = data[i];
                    this.horarios.push(horario);
                }
            },
            error => {
                error.json()['Message'];
            });

        this.canchaService.getAll().subscribe(
            data => {
                this.lsCanchas = [];
                for (let i = 0; i < data.length; i++) {
                    var cancha = new Cancha();
                    cancha = data[i];
                    this.lsCanchas.push(cancha);
                }
            },
            error => {
                error.json()['Message'];
            });
    }

    public equiposPorZona(zona: Zona) {
        this.equipoService.getAllPorZona(zona.id_zona).subscribe(
            data => {
                this.equipos = [];
                for (var j = 0; j < data.length; j++) {
                    var equipo = new IEquipo();
                    if (this.id_torneo == data[j]['torneo']['id_torneo']) {
                        equipo.id_equipo = data[j]['id_equipo'];
                        equipo.nombre = data[j]['nombre'];
                        equipo.logo = data[j]['logo'];
                        this.equipos.push(equipo);
                    }
                }
                for (let i = 0; i < this.equipos.length; i++) {
                    this.fileService.getImagesByEquipo(this.equipos[i].logo).subscribe(
                        data => {
                            if (data['ImagePath'] != null) {
                                this.equipos[i].imagePath = data['ImagePath'];
                            }
                        },
                        error => {
                        });
                }
            },
            error => {
                error.json()['Message'];
            });

    }

    local = new Array<IEquipo>();
    visitante = new Array<IEquipo>();

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

    public dibujarPartidos() {
        console.error(this.cantidadPartidos);

        for (var i = 0; i < this.cantidadPartidos; i++) {
            this.partidos.push(new IPartido());
        }
        console.error(this.partidos);
    }

    enfrentamiento(obj: any) {
        console.error(obj);
    }

    registrarFecha() {
        console.error(this.partidos);
        var lsPartidos = new Array<Partido>();
        lsPartidos = this.parserService.parsePartidos(this.partidos, this.fecha);
        console.error(lsPartidos);

        this.fixtureService.create(lsPartidos).subscribe(
            data => {
                if (data) {
                    console.error("Se resgistro bien");
                }
            }, error => {

            }
        );

    }

    limpiarCampos() {
        this.ngOnInit();
    }


    routeAlta() {
        this.router.navigate(['home/fixture-armado']);
    }

    routeModificacion() {
        this.router.navigate(['home/fixture-armado']);
    }
}
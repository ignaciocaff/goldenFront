import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FileService } from '../../../services/entity-services/file.service';
import { Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo, Zona, IEquipo } from '../../../entities/index';
import { EquipoService, ZonaService } from '../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { AppConfig } from '../../../app.config';

@Component({
    selector: 'zona-update',
    moduleId: module.id,
    templateUrl: './zona-update.component.html',
    styleUrls: ['./zona-update.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [EquipoService, ZonaService]
})
export class ZonaUpdateComponent implements OnInit {

    equiposSinZona = new Array<IEquipo>();
    equipos = new Array<IEquipo>();
    zonas = new Array<Zona>();
    lsZonas = new Array<Zona>();
    lsEquiposA = new Array<Equipo>();
    lsEquiposB = new Array<Equipo>();
    lsEquiposC = new Array<Equipo>();
    lsEquiposD = new Array<Equipo>();
    lsEquiposE = new Array<Equipo>();
    lsEquiposF = new Array<Equipo>();
    lsEquiposG = new Array<Equipo>();
    lsEquiposH = new Array<Equipo>();
    esUltimoEquipo: Boolean = false;

    zonaA: any[] = [];
    zonaB: any[] = [];
    zonaC: any[] = [];
    zonaD: any[] = [];
    zonaE: any[] = [];
    zonaF: any[] = [];
    zonaG: any[] = [];
    zonaH: any[] = [];
    listaZonas: any[] = [this.zonaA, this.zonaB, this.zonaC, this.zonaD, this.zonaE, this.zonaF, this.zonaG, this.zonaH];

    id_fase: number;
    imagesEscudos: Array<any> = [];
    cantidadZonas: number;
    id_torneo: number;

    sourceItems = [
    ];
    constructor(private fileService: FileService,
        private router: Router, public equipoService: EquipoService,
        public zonaService: ZonaService,
        public toastr: ToastsManager,
        public config: AppConfig) {
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.id_fase = Number(sessionStorage.getItem('fase'));
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
                this.armadoZonas();
            }, error => {

            }
        );

        this.equipoService.getAllSinZona(this.id_torneo).subscribe(
            data => {
                this.equiposSinZona = [];
                for (var j = 0; j < data.length; j++) {
                    var equipo = new IEquipo();
                    if (this.id_torneo == data[j]['torneo']['id_torneo']) {
                        equipo.id_equipo = data[j]['id_equipo'];
                        equipo.nombre = data[j]['nombre'];
                        equipo.logo = data[j]['logo'];
                        this.equiposSinZona.push(equipo);
                    }
                }
                for (let i = 0; i < this.equiposSinZona.length; i++) {
                    this.fileService.getImagesByEquipo(this.equiposSinZona[i].logo).subscribe(
                        data => {
                            if (data['ThumbPath'] != null) {
                                this.equiposSinZona[i].imagePath = data['ThumbPath'];
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

    armadoZonas() {
        for (let i = 0; i < this.lsZonas.length; i++) {
            switch (this.lsZonas[i].descripcion) {
                case 'A':
                    this.servicioZonasA(i);
                    break;
                case 'B':
                    this.servicioZonasB(i);
                    break;
                case 'C':
                    this.servicioZonasC(i);
                    break;
                case 'D':
                    this.servicioZonasD(i);
                    break;
                case 'E':
                    this.servicioZonasE(i);
                    break;
                case 'F':
                    this.servicioZonasF(i);
                    break;
                case 'G':
                    this.servicioZonasG(i);
                    break;
                case 'H':
                    this.servicioZonasH(i);
                    break;
                case 'Playoff A':
                    this.servicioZonasA(i);
                    break;
                case 'Playoff B':
                    this.servicioZonasB(i);
                    break;
                case 'Playoff C':
                    this.servicioZonasC(i);
                    break;
                case 'Playoff D':
                    this.servicioZonasD(i);
                    break;
                case 'Playoff E':
                    this.servicioZonasE(i);
                    break;
                case 'Playoff F':
                    this.servicioZonasF(i);
                    break;
                case 'Playoff G':
                    this.servicioZonasG(i);
                    break;
                case 'Playoff H':
                    this.servicioZonasH(i);
                    break;

            }
        }

    }

    servicioZonasA(i: number) {
        this.zonaA = [];
        for (let f = 0; f < this.lsZonas[i].lsEquipos.length; f++) {
            this.fileService.getImagesByEquipo(this.lsZonas[i].lsEquipos[f].logo).subscribe(
                data => {
                    var equipo = new IEquipo();
                    this.equipos[f] = equipo;
                    if (data['ImagePath'] != null) {
                        this.equipos[f].imagePath = data['ImagePath'];
                    }
                    this.equipos[f].nombre = this.lsZonas[i].lsEquipos[f].nombre;
                    this.equipos[f].id_equipo = this.lsZonas[i].lsEquipos[f].id_equipo;
                    this.zonaA.push(this.equipos[f]);
                },
                error => {
                });
        }
    }

    servicioZonasB(i: number) {
        this.zonaB = [];
        for (let f = 0; f < this.lsZonas[i].lsEquipos.length; f++) {
            this.fileService.getImagesByEquipo(this.lsZonas[i].lsEquipos[f].logo).subscribe(
                data => {
                    var equipo = new IEquipo();
                    this.equipos[f] = equipo;
                    if (data['ImagePath'] != null) {
                        this.equipos[f].imagePath = data['ImagePath'];
                    }
                    this.equipos[f].nombre = this.lsZonas[i].lsEquipos[f].nombre;
                    this.equipos[f].id_equipo = this.lsZonas[i].lsEquipos[f].id_equipo;
                    this.zonaB.push(this.equipos[f]);
                },
                error => {
                });
        }
    }
    servicioZonasC(i: number) {
        this.zonaC = [];
        for (let f = 0; f < this.lsZonas[i].lsEquipos.length; f++) {
            this.fileService.getImagesByEquipo(this.lsZonas[i].lsEquipos[f].logo).subscribe(
                data => {
                    var equipo = new IEquipo();
                    this.equipos[f] = equipo;
                    if (data['ImagePath'] != null) {
                        this.equipos[f].imagePath = data['ImagePath'];
                    }
                    this.equipos[f].nombre = this.lsZonas[i].lsEquipos[f].nombre;
                    this.equipos[f].id_equipo = this.lsZonas[i].lsEquipos[f].id_equipo;
                    this.zonaC.push(this.equipos[f]);
                },
                error => {
                });
        }
    }
    servicioZonasD(i: number) {
        this.zonaD = [];
        for (let f = 0; f < this.lsZonas[i].lsEquipos.length; f++) {
            this.fileService.getImagesByEquipo(this.lsZonas[i].lsEquipos[f].logo).subscribe(
                data => {
                    var equipo = new IEquipo();
                    this.equipos[f] = equipo;
                    if (data['ImagePath'] != null) {
                        this.equipos[f].imagePath = data['ImagePath'];
                    }
                    this.equipos[f].nombre = this.lsZonas[i].lsEquipos[f].nombre;
                    this.equipos[f].id_equipo = this.lsZonas[i].lsEquipos[f].id_equipo;
                    this.zonaD.push(this.equipos[f]);
                },
                error => {
                });
        }
    }
    servicioZonasE(i: number) {
        this.zonaE = [];
        for (let f = 0; f < this.lsZonas[i].lsEquipos.length; f++) {
            this.fileService.getImagesByEquipo(this.lsZonas[i].lsEquipos[f].logo).subscribe(
                data => {
                    var equipo = new IEquipo();
                    this.equipos[f] = equipo;
                    if (data['ImagePath'] != null) {
                        this.equipos[f].imagePath = data['ImagePath'];
                    }
                    this.equipos[f].nombre = this.lsZonas[i].lsEquipos[f].nombre;
                    this.equipos[f].id_equipo = this.lsZonas[i].lsEquipos[f].id_equipo;
                    this.zonaE.push(this.equipos[f]);
                },
                error => {
                });
        }
    }
    servicioZonasF(i: number) {
        this.zonaF = [];
        for (let f = 0; f < this.lsZonas[i].lsEquipos.length; f++) {
            this.fileService.getImagesByEquipo(this.lsZonas[i].lsEquipos[f].logo).subscribe(
                data => {
                    var equipo = new IEquipo();
                    this.equipos[f] = equipo;
                    if (data['ImagePath'] != null) {
                        this.equipos[f].imagePath = data['ImagePath'];
                    }
                    this.equipos[f].nombre = this.lsZonas[i].lsEquipos[f].nombre;
                    this.equipos[f].id_equipo = this.lsZonas[i].lsEquipos[f].id_equipo;
                    this.zonaF.push(this.equipos[f]);
                },
                error => {
                });
        }
    }
    servicioZonasG(i: number) {
        this.zonaG = [];
        for (let f = 0; f < this.lsZonas[i].lsEquipos.length; f++) {
            this.fileService.getImagesByEquipo(this.lsZonas[i].lsEquipos[f].logo).subscribe(
                data => {
                    var equipo = new IEquipo();
                    this.equipos[f] = equipo;
                    if (data['ImagePath'] != null) {
                        this.equipos[f].imagePath = data['ImagePath'];
                    }
                    this.equipos[f].nombre = this.lsZonas[i].lsEquipos[f].nombre;
                    this.equipos[f].id_equipo = this.lsZonas[i].lsEquipos[f].id_equipo;
                    this.zonaG.push(this.equipos[f]);
                },
                error => {
                });
        }
    }
    servicioZonasH(i: number) {
        this.zonaH = [];
        for (let f = 0; f < this.lsZonas[i].lsEquipos.length; f++) {
            this.fileService.getImagesByEquipo(this.lsZonas[i].lsEquipos[f].logo).subscribe(
                data => {
                    var equipo = new IEquipo();
                    this.equipos[f] = equipo;
                    if (data['ImagePath'] != null) {
                        this.equipos[f].imagePath = data['ImagePath'];
                    }
                    this.equipos[f].nombre = this.lsZonas[i].lsEquipos[f].nombre;
                    this.equipos[f].id_equipo = this.lsZonas[i].lsEquipos[f].id_equipo;
                    this.zonaH.push(this.equipos[f]);
                },
                error => {
                });
        }
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

    public zona(lsEquipos: any): boolean {

        if (lsEquipos.length == 1) {
            return false;
        }
        return true;
    }

    onchange(obj: any) {

    }

    modificarZona() {
        if (this.id_fase == 3) {
            for (var j = 0; j < this.lsZonas.length; j++) {
                switch (this.lsZonas[j].descripcion) {
                    case 'Playoff A':
                        for (var i = 0; i < this.zonaA.length; i++) {
                            this.lsEquiposA.push(new Equipo(this.zonaA[i].id_equipo, this.zonaA[i].nombre))
                        }
                        this.lsZonas[j].lsEquipos = this.lsEquiposA;
                        break;
                    case 'Playoff B':
                        for (var i = 0; i < this.zonaB.length; i++) {
                            this.lsEquiposB.push(new Equipo(this.zonaB[i].id_equipo, this.zonaB[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposB;
                        break;
                    case 'Playoff C':
                        for (var i = 0; i < this.zonaC.length; i++) {
                            this.lsEquiposC.push(new Equipo(this.zonaC[i].id_equipo, this.zonaC[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposC;
                        break;
                    case 'Playoff D':
                        for (var i = 0; i < this.zonaD.length; i++) {
                            this.lsEquiposD.push(new Equipo(this.zonaD[i].id_equipo, this.zonaD[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposD;
                        break;
                    case 'Playoff E':
                        for (var i = 0; i < this.zonaE.length; i++) {
                            this.lsEquiposE.push(new Equipo(this.zonaE[i].id_equipo, this.zonaE[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposE;
                        break;
                    case 'Playoff F':
                        for (var i = 0; i < this.zonaF.length; i++) {
                            this.lsEquiposF.push(new Equipo(this.zonaF[i].id_equipo, this.zonaF[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposF;
                        break;
                    case 'Playoff G':
                        for (var i = 0; i < this.zonaG.length; i++) {
                            this.lsEquiposG.push(new Equipo(this.zonaG[i].id_equipo, this.zonaG[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposG;
                        break;
                    case 'Playoff H':
                        for (var i = 0; i < this.zonaH.length; i++) {
                            this.lsEquiposH.push(new Equipo(this.zonaH[i].id_equipo, this.zonaH[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposH;
                        break;
                }
            }
        } else {
            for (var j = 0; j < this.lsZonas.length; j++) {
                switch (this.lsZonas[j].descripcion) {
                    case 'A':
                        for (var i = 0; i < this.zonaA.length; i++) {
                            this.lsEquiposA.push(new Equipo(this.zonaA[i].id_equipo, this.zonaA[i].nombre))
                        }
                        this.lsZonas[j].lsEquipos = this.lsEquiposA;
                        break;
                    case 'B':
                        for (var i = 0; i < this.zonaB.length; i++) {
                            this.lsEquiposB.push(new Equipo(this.zonaB[i].id_equipo, this.zonaB[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposB;
                        break;
                    case 'C':
                        for (var i = 0; i < this.zonaC.length; i++) {
                            this.lsEquiposC.push(new Equipo(this.zonaC[i].id_equipo, this.zonaC[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposC;
                        break;
                    case 'D':
                        for (var i = 0; i < this.zonaD.length; i++) {
                            this.lsEquiposD.push(new Equipo(this.zonaD[i].id_equipo, this.zonaD[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposD;
                        break;
                    case 'E':
                        for (var i = 0; i < this.zonaE.length; i++) {
                            this.lsEquiposE.push(new Equipo(this.zonaE[i].id_equipo, this.zonaE[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposE;
                        break;
                    case 'F':
                        for (var i = 0; i < this.zonaF.length; i++) {
                            this.lsEquiposF.push(new Equipo(this.zonaF[i].id_equipo, this.zonaF[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposF;
                        break;
                    case 'G':
                        for (var i = 0; i < this.zonaG.length; i++) {
                            this.lsEquiposG.push(new Equipo(this.zonaG[i].id_equipo, this.zonaG[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposG;
                        break;
                    case 'H':
                        for (var i = 0; i < this.zonaH.length; i++) {
                            this.lsEquiposH.push(new Equipo(this.zonaH[i].id_equipo, this.zonaH[i].nombre))
                        } this.lsZonas[j].lsEquipos = this.lsEquiposH;
                        break;
                }
            }
        }
        this.zonaService.update(this.lsZonas).subscribe(
            data => {
                if (data) {
                    this.toastr.success('Ls zonas se han modificado con éxito', 'Éxito!');
                    this.limpiarCampos();
                }
            },
            error => {
                this.toastr.error('Hubo un problema para modificar las zonas', 'Error!');
                this.limpiarCampos();
            });
    }
    limpiarCampos() {
        this.lsEquiposA = [];
        this.lsEquiposB = [];
        this.lsEquiposC = [];
        this.lsEquiposD = [];
        this.lsEquiposE = [];
        this.lsEquiposF = [];
        this.lsEquiposG = [];
        this.lsEquiposH = [];
        this.zonaA = [];
        this.zonaB = [];
        this.zonaC = [];
        this.zonaD = [];
        this.zonaE = [];
        this.zonaF = [];
        this.zonaG = [];
        this.zonaH = [];
        this.zonas = [];
        this.cantidadZonas = null;
        this.lsZonas = [];
        this.ngOnInit();
    }

    public intercambioLetraPorNumero(descripcion: string): string {
        var descripLetra: string;
        switch (descripcion) {
            case '1': {
                descripLetra = 'A';
                break;
            } case '2': {
                descripLetra = 'B';
                break;
            } case '3': {
                descripLetra = 'C';
                break;
            } case '4': {
                descripLetra = 'D';
                break;
            } case '5': {
                descripLetra = 'E';
                break;
            } case '6': {
                descripLetra = 'F';
                break;
            } case '7': {
                descripLetra = 'G';
                break;
            } case '8': {
                descripLetra = 'H';
                break;
            }
        }

        return descripLetra;
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
}
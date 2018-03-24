import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FileService } from '../../../services/entity-services/file.service';
import { Torneo, TipoTorneo, Modalidad, Regla, Categoria, Equipo, Zona } from '../../../entities/index';
import { EquipoService, ZonaService } from '../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'zona',
    moduleId: module.id,
    templateUrl: './zona.component.html',
    styleUrls: ['./zona.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [EquipoService, ZonaService]
})
export class ZonaComponent implements OnInit {

    equipos = new Array<IEquipo>();
    zonas = new Array<Zona>();
    lsEquiposA = new Array<Equipo>();
    lsEquiposB = new Array<Equipo>();
    lsEquiposC = new Array<Equipo>();
    lsEquiposD = new Array<Equipo>();
    lsEquiposE = new Array<Equipo>();
    lsEquiposF = new Array<Equipo>();
    lsEquiposG = new Array<Equipo>();
    lsEquiposH = new Array<Equipo>();

    imagesEscudos: Array<any> = [];
    cantidadZonas: number;
    id_torneo: number;

    sourceItems = [
    ];
    constructor(private fileService: FileService, public equipoService: EquipoService,
        private router: Router, public zonaService: ZonaService, public toastr: ToastsManager) {
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
    }

    ngOnInit() {
        this.equipoService.getAll().subscribe(
            data => {
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

    zonaA: any[] = [];
    zonaB: any[] = [];
    zonaC: any[] = [];
    zonaD: any[] = [];
    zonaE: any[] = [];
    zonaF: any[] = [];
    zonaG: any[] = [];
    zonaH: any[] = [];

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

    armarZonas() {
        this.zonas = [];
        for (var i = 0; i < this.cantidadZonas; i++) {
            var zona = new Zona();
            zona.descripcion = this.intercambioLetraPorNumero((i + 1).toString());
            zona.torneo.id_torneo = this.id_torneo;
            this.zonas.push(zona);
        }
    }

    comprobacionZonasVacias() {
        let contador: number = 0;

        if (this.zonaA.length > 0) {
            contador = contador + 1;
        }

        if (this.zonaB.length > 0) {
            contador = contador + 1;
        }

        if (this.zonaC.length > 0) {
            contador = contador + 1;
        }

        if (this.zonaD.length > 0) {
            contador = contador + 1;
        }

        if (this.zonaE.length > 0) {
            contador = contador + 1;
        }

        if (this.zonaF.length > 0) {
            contador = contador + 1;
        }

        if (this.zonaG.length > 0) {
            contador = contador + 1;
        }
        if (this.zonaH.length > 0) {
            contador = contador + 1;
        }

        if (contador == this.cantidadZonas) {
            this.altaZona();
        } else {
            this.toastr.error("Es necesario completar todas las zonas que eligió", "Error!");
        }
    }

    altaZona() {
        for (var j = 0; j < this.zonas.length; j++) {
            switch (this.zonas[j].descripcion) {
                case 'A':
                    for (var i = 0; i < this.zonaA.length; i++) {
                        this.lsEquiposA.push(new Equipo(this.zonaA[i].id_equipo, this.zonaA[i].nombre))
                    }
                    this.zonas[j].lsEquipos = this.lsEquiposA;
                    break;
                case 'B':
                    for (var i = 0; i < this.zonaB.length; i++) {
                        this.lsEquiposB.push(new Equipo(this.zonaB[i].id_equipo, this.zonaB[i].nombre))
                    } this.zonas[j].lsEquipos = this.lsEquiposB;
                    break;
                case 'C':
                    for (var i = 0; i < this.zonaC.length; i++) {
                        this.lsEquiposC.push(new Equipo(this.zonaC[i].id_equipo, this.zonaC[i].nombre))
                    } this.zonas[j].lsEquipos = this.lsEquiposC;
                    break;
                case 'D':
                    for (var i = 0; i < this.zonaD.length; i++) {
                        this.lsEquiposD.push(new Equipo(this.zonaD[i].id_equipo, this.zonaD[i].nombre))
                    } this.zonas[j].lsEquipos = this.lsEquiposD;
                    break;
                case 'E':
                    for (var i = 0; i < this.zonaE.length; i++) {
                        this.lsEquiposE.push(new Equipo(this.zonaE[i].id_equipo, this.zonaE[i].nombre))
                    } this.zonas[j].lsEquipos = this.lsEquiposE;
                    break;
                case 'F':
                    for (var i = 0; i < this.zonaF.length; i++) {
                        this.lsEquiposF.push(new Equipo(this.zonaF[i].id_equipo, this.zonaF[i].nombre))
                    } this.zonas[j].lsEquipos = this.lsEquiposF;
                    break;
                case 'G':
                    for (var i = 0; i < this.zonaG.length; i++) {
                        this.lsEquiposG.push(new Equipo(this.zonaG[i].id_equipo, this.zonaG[i].nombre))
                    } this.zonas[j].lsEquipos = this.lsEquiposG;
                    break;
                case 'H':
                    for (var i = 0; i < this.zonaH.length; i++) {
                        this.lsEquiposH.push(new Equipo(this.zonaH[i].id_equipo, this.zonaH[i].nombre))
                    } this.zonas[j].lsEquipos = this.lsEquiposH;
                    break;
            }
        }

        this.zonaService.create(this.zonas).subscribe(
            data => {
                if (data) {
                    this.toastr.success('Las zonas se han creado', 'Éxito!');
                    this.limpiarCampos();
                }
            },
            error => {
                this.toastr.error('Hubo un problema para crear las zonas', 'Error!');
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
}

export class IEquipo {
    nombre: string;
    id_equipo: number;
    imagePath: string;
    logo: number;

    constructor(
        nombre?: string,
        id_equipo?: number,
        imagePath?: string,
        logo?: number
    ) {
        if (nombre) this.nombre = nombre;
        else this.nombre = null;

        if (id_equipo) this.id_equipo = id_equipo;
        else this.id_equipo = null;

        if (imagePath) this.imagePath = imagePath;
        else this.imagePath = null;

        if (logo) this.logo = logo;
        else this.logo = null;
    }
}
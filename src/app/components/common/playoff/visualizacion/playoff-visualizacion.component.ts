import { Component, Directive, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Zona, IPartido, IEquipo } from '../../../../entities/index';
import { ZonaService, PlayoffService } from '../../../../services/entity-services/index';
import { AppConfig } from '../../../../app.config';


@Component({
    selector: 'playoff-visualizacion',
    moduleId: module.id,
    templateUrl: './playoff-visualizacion.component.html',
    styleUrls: ['./playoff-visualizacion.component.scss'],
    providers: [ZonaService]
})
export class PlayoffVisualizacionComponent implements OnInit {

    id_torneo: number;
    lsZonas = new Array<Zona>();
    lsPartidos = new Array<IPartido>();

    playoffA: any[] = [];
    cuartosA: any[] = [];
    semisA: any[] = [];
    finalA: any[] = [];

    playoffB: any[] = [];
    cuartosB: any[] = [];
    semisB: any[] = [];
    finalB: any[] = [];

    playoffC: any[] = [];
    cuartosC: any[] = [];
    semisC: any[] = [];
    finalC: any[] = [];

    playoffD: any[] = [];
    cuartosD: any[] = [];
    semisD: any[] = [];
    finalD: any[] = [];

    playoffE: any[] = [];
    cuartosE: any[] = [];
    semisE: any[] = [];
    finalE: any[] = [];

    playoffF: any[] = [];
    cuartosF: any[] = [];
    semisF: any[] = [];
    finalF: any[] = [];

    playoffG: any[] = [];
    cuartosG: any[] = [];
    semisG: any[] = [];
    finalG: any[] = [];

    playoffH: any[] = [];
    cuartosH: any[] = [];
    semisH: any[] = [];
    finalH: any[] = [];

    constructor(
        public config: AppConfig,
        public zonaService: ZonaService,
        public playoffService: PlayoffService
    ) {
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
                this.obtenerPartidos();
            }, error => {
            });


    }

    obtenerPartidos() {
        this.playoffService.getPlayoffsTorneo(this.id_torneo).subscribe(
            data => {
                if (data) {
                    this.lsPartidos = data;
                }
                this.armarPlayoff();
            }, error => {
            }
        );
    }

    armarPlayoff() {
        for (let i = 0; i < this.lsZonas.length; i++) {
            switch (this.lsZonas[i].descripcion) {
                case 'Playoff A':
                    this.servicioPlayoffA(i);
                    break;
                case 'Playoff B':
                    this.servicioPlayoffB(i);
                    break;
                case 'Playoff C':
                    this.servicioPlayoffC(i);
                    break;
                case 'Playoff D':
                    this.servicioPlayoffD(i);
                    break;
                case 'Playoff E':
                    this.servicioPlayoffE(i);
                    break;
                case 'Playoff F':
                    this.servicioPlayoffF(i);
                    break;
                case 'Playoff G':
                    this.servicioPlayoffG(i);
                    break;
                case 'Playoff H':
                    this.servicioPlayoffH(i);
                    break;
            }
        }
    }

    servicioPlayoffA(i: number) {
        this.playoffA = [];
        this.cuartosA = [];
        this.semisA = [];
        this.finalA = [];

        for (let f = this.lsZonas[i].lsEquipos.length - 1; f >= 0; f--) {
            for (var g = 0; g < this.lsPartidos.length; g++) {
                if ((this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].local[0].id_equipo) ||
                    (this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].visitante[0].id_equipo)) {
                    switch (this.lsPartidos[g].etapa.descripcion) {
                        case '4tos':
                            this.cuartosA.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.cuartosA.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Semifinal':
                            this.semisA.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.semisA.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Final':
                            this.finalA.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.finalA.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                    }
                }
            }
        }
        this.playoffA.push(this.cuartosA);
        this.playoffA.push(this.semisA);
        this.playoffA.push(this.finalA);
    }

    servicioPlayoffB(i: number) {
        this.playoffB = [];
        this.cuartosB = [];
        this.semisB = [];
        this.finalB = [];

        for (let f = this.lsZonas[i].lsEquipos.length - 1; f >= 0; f--) {
            for (var g = 0; g < this.lsPartidos.length; g++) {
                if ((this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].local[0].id_equipo) ||
                    (this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].visitante[0].id_equipo)) {
                    switch (this.lsPartidos[g].etapa.descripcion) {
                        case '4tos':
                            this.cuartosB.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.cuartosB.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Semifinal':
                            this.semisB.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.semisB.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Final':
                            this.finalB.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.finalB.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                    }
                }
            }
        }
        this.playoffB.push(this.cuartosB);
        this.playoffB.push(this.semisB);
        this.playoffB.push(this.finalB);
    }

    servicioPlayoffC(i: number) {
        this.playoffC = [];
        this.cuartosC = [];
        this.semisC = [];
        this.finalC = [];

        for (let f = this.lsZonas[i].lsEquipos.length - 1; f >= 0; f--) {
            for (var g = 0; g < this.lsPartidos.length; g++) {
                if ((this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].local[0].id_equipo) ||
                    (this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].visitante[0].id_equipo)) {
                    switch (this.lsPartidos[g].etapa.descripcion) {
                        case '4tos':
                            this.cuartosC.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.cuartosC.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Semifinal':
                            this.semisC.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.semisC.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Final':
                            this.finalC.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.finalC.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                    }
                }
            }
        }
        this.playoffC.push(this.cuartosC);
        this.playoffC.push(this.semisC);
        this.playoffC.push(this.finalC);
    }

    servicioPlayoffD(i: number) {
        this.playoffD = [];
        this.cuartosD = [];
        this.semisD = [];
        this.finalD = [];

        for (let f = this.lsZonas[i].lsEquipos.length - 1; f >= 0; f--) {
            for (var g = 0; g < this.lsPartidos.length; g++) {
                if ((this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].local[0].id_equipo) ||
                    (this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].visitante[0].id_equipo)) {
                    switch (this.lsPartidos[g].etapa.descripcion) {
                        case '4tos':
                            this.cuartosD.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.cuartosD.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Semifinal':
                            this.semisD.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.semisD.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Final':
                            this.finalD.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.finalD.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                    }
                }
            }
        }
        this.playoffD.push(this.cuartosD);
        this.playoffD.push(this.semisD);
        this.playoffD.push(this.finalD);
    }

    servicioPlayoffE(i: number) {
        this.playoffE = [];
        this.cuartosE = [];
        this.semisE = [];
        this.finalE = [];

        for (let f = this.lsZonas[i].lsEquipos.length - 1; f >= 0; f--) {
            for (var g = 0; g < this.lsPartidos.length; g++) {
                if ((this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].local[0].id_equipo) ||
                    (this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].visitante[0].id_equipo)) {
                    switch (this.lsPartidos[g].etapa.descripcion) {
                        case '4tos':
                            this.cuartosE.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.cuartosE.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Semifinal':
                            this.semisE.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.semisE.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Final':
                            this.finalE.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.finalE.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                    }
                }
            }
        }
        this.playoffE.push(this.cuartosE);
        this.playoffE.push(this.semisE);
        this.playoffE.push(this.finalE);
    }

    servicioPlayoffF(i: number) {
        this.playoffF = [];
        this.cuartosF = [];
        this.semisF = [];
        this.finalF = [];

        for (let f = this.lsZonas[i].lsEquipos.length - 1; f >= 0; f--) {
            for (var g = 0; g < this.lsPartidos.length; g++) {
                if ((this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].local[0].id_equipo) ||
                    (this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].visitante[0].id_equipo)) {
                    switch (this.lsPartidos[g].etapa.descripcion) {
                        case '4tos':
                            this.cuartosF.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.cuartosF.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Semifinal':
                            this.semisF.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.semisF.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Final':
                            this.finalF.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.finalF.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                    }
                }
            }
        }
        this.playoffF.push(this.cuartosF);
        this.playoffF.push(this.semisF);
        this.playoffF.push(this.finalF);
    }

    servicioPlayoffG(i: number) {
        this.playoffG = [];
        this.cuartosG = [];
        this.semisG = [];
        this.finalG = [];

        for (let f = this.lsZonas[i].lsEquipos.length - 1; f >= 0; f--) {
            for (var g = 0; g < this.lsPartidos.length; g++) {
                if ((this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].local[0].id_equipo) ||
                    (this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].visitante[0].id_equipo)) {
                    switch (this.lsPartidos[g].etapa.descripcion) {
                        case '4tos':
                            this.cuartosG.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.cuartosG.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Semifinal':
                            this.semisG.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.semisG.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Final':
                            this.finalG.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.finalG.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                    }
                }
            }
        }
        this.playoffG.push(this.cuartosG);
        this.playoffG.push(this.semisG);
        this.playoffG.push(this.finalG);
    }

    servicioPlayoffH(i: number) {
        this.playoffH = [];
        this.cuartosH = [];
        this.semisH = [];
        this.finalH = [];

        for (let f = this.lsZonas[i].lsEquipos.length - 1; f >= 0; f--) {
            for (var g = 0; g < this.lsPartidos.length; g++) {
                if ((this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].local[0].id_equipo) ||
                    (this.lsZonas[i].lsEquipos[f].id_equipo == this.lsPartidos[g].visitante[0].id_equipo)) {
                    switch (this.lsPartidos[g].etapa.descripcion) {
                        case '4tos':
                            this.cuartosH.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.cuartosH.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Semifinal':
                            this.semisH.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.semisH.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                        case 'Final':
                            this.finalH.push(this.lsPartidos[g]);
                            this.lsPartidos.splice(g, 1);
                            this.finalH.sort((a, b) => a.llave.id_llave - b.llave.id_llave);
                            break;
                    }
                }
            }
        }
        this.playoffH.push(this.cuartosH);
        this.playoffH.push(this.semisH);
        this.playoffH.push(this.finalH);
    }
}
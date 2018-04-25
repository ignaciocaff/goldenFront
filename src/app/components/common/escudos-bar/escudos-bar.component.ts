import { Component, Directive, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoginComponent } from '../../common/login/index';
import { Subscription } from 'rxjs/Subscription';
import { TorneoEmitter } from '../../../services/common-services/index';
import { FileService } from '../../../services/entity-services/file.service';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { EquipoService } from '../../../services/entity-services/index';
import { IEquipo } from '../../../entities/index';


@Component({
    selector: 'escudos',
    moduleId: module.id,
    templateUrl: './escudos-bar.component.html',
    styleUrls: ['./escudos-bar.component.css'],
    providers: [],
    encapsulation: ViewEncapsulation.None
})
export class EscudosComponent implements OnInit, DoCheck {
    @ViewChild(LoginComponent) login: LoginComponent;
    nombre: String;
    images: Array<any> = [];
    id_torneo: Number;
    public innerWidth: any;

    lsEquipos = new Array<IEquipo>();
    slideConfig = { "slidesToShow": 10, "slidesToScroll": 4 };
    constructor(
        private torneoEmiiter: TorneoEmitter,
        private fileService: FileService,
        public equipoService: EquipoService,
        private router: Router
    ) {

    }
    ngOnInit() {
        this.nombre = sessionStorage.getItem('torneo');
        this.torneoEmiiter.onMyEvent.subscribe((value: string) => this.nombre = value
        );
        this.innerWidth = window.innerWidth;

        if (this.innerWidth > 1600) {
            this.slideConfig = { "slidesToShow": 25, "slidesToScroll": 3 };
        } else if (this.innerWidth > 1200) {
            this.slideConfig = { "slidesToShow": 20, "slidesToScroll": 4 };
        }
        var id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.equipoService.getAllPorTorneo(id_torneo).subscribe(
            data => {
                this.lsEquipos = [];
                for (var j = 0; j < data.length; j++) {
                    var equipo = new IEquipo();
                    equipo.id_equipo = data[j]['id_equipo'];
                    equipo.nombre = data[j]['nombre'];
                    equipo.logo = data[j]['logo'];
                    this.lsEquipos.push(equipo);

                }
                for (let i = 0; i < this.lsEquipos.length; i++) {
                    this.fileService.getImagesByEquipo(this.lsEquipos[i].logo).subscribe(
                        data => {
                            if (data['ImagePath'] != null) {
                                this.lsEquipos[i].imagePath = data['ImagePath'];
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

    verEquipo(id_equipo: number) {
        this.router.navigate(['home/equipo/' + id_equipo]);
    }

    ngDoCheck() {
        if (this.id_torneo !== Number(sessionStorage.getItem('id_torneo'))) {
            this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
            this.ngOnInit();
        }
    }
}

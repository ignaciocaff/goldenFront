import { Component, Directive, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoginComponent } from '../../common/login/index';
import { Subscription } from 'rxjs/Subscription';
import { TorneoEmitter } from '../../../services/common-services/index';
import { FileService } from '../../../services/entity-services/file.service';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'escudos',
    moduleId: module.id,
    templateUrl: './escudos-bar.component.html',
    styleUrls: ['./escudos-bar.component.css'],
    providers: []
})
export class EscudosComponent implements OnInit, DoCheck {
    @ViewChild(LoginComponent) login: LoginComponent;
    nombre: String;
    images: Array<any> = [];
    id_torneo: Number;

    constructor(private torneoEmiiter: TorneoEmitter, private fileService: FileService) {

    }

    ngOnInit() {
        this.nombre = sessionStorage.getItem('torneo');
        this.torneoEmiiter.onMyEvent.subscribe((value: string) => this.nombre = value
        );
    }

    ngDoCheck() {
        if (this.id_torneo !== Number(sessionStorage.getItem('id_torneo'))) {
            this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
            this.getEscudos();
        }
    }
    getEscudos() {
        this.fileService.getImagesByTorneo(this.id_torneo).subscribe(
            data => {
                this.images = [];
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        this.images.push(data[i]);
                    }
                }
            },
            error => { }
        );
    }
}

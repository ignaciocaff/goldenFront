import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FooterComponent } from './footer/index';
import { NavComponent } from './nav/index';
import { HeaderComponent } from './header/index';
import { SectionComponent } from './section/index';
import { TorneoService } from '../services/index';
import { Torneo } from '../entities/index';
import { TorneoEmitter } from '../services/common-services/index';
import { HomeComponent } from './home/index';


@Component({
    selector: 'container',
    moduleId: module.id,
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.css'],
    providers: [TorneoService]
})
export class ContainerComponent implements OnInit {
    @ViewChild(FooterComponent) footer: FooterComponent;
    @ViewChild(NavComponent) nav: NavComponent;
    @ViewChild(SectionComponent) section: SectionComponent;
    @ViewChild(HeaderComponent) header: HeaderComponent;

    public lsTorneos = new Array<Torneo>();
    torneo: Torneo = new Torneo();
    constructor(
        private router: Router,
        private torneoService: TorneoService,
        private torneoEmitter: TorneoEmitter
    ) {
        this.setTorneo();
    }

    ngOnInit() {

    }

    setTorneo() {
        this.torneoService.getAll().subscribe(
            data => {
                for (var i = 0; i < data.length; i++) {
                    let torneo = data[i];
                    this.lsTorneos.push(torneo);
                }
                this.torneo = this.lsTorneos.find(x => x.id_torneo == 1);
                sessionStorage.setItem('torneo', this.torneo.nombre);
                sessionStorage.setItem('id_torneo', String(this.torneo.id_torneo));
                this.torneoEmitter.trigger(this.torneo.nombre);
            }, error => {

            }
        );
    }
}
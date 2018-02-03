import { Component, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { JugadoresCargaComponent } from '../common/jugadores/index';
import { ConfiguracionesContainerComponent } from '../common/configuraciones/index';
import { EquipoComponent } from '../common/equipo/index';
import { HomeComponent } from '../home/index';

@Component({
    selector: 'section',
    moduleId: module.id,
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.css'],
    providers: []
})
export class SectionComponent {
    @ViewChild(JugadoresCargaComponent) jugadores: JugadoresCargaComponent;
    @ViewChild(ConfiguracionesContainerComponent) conf: ConfiguracionesContainerComponent;
    @ViewChild(EquipoComponent) equipo: EquipoComponent;
    @ViewChild(HomeComponent) home: HomeComponent;

}
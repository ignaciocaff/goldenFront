import { Component, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { JugadoresCargaComponent } from '../common/jugadores/index'
@Component({
    selector: 'section',
    moduleId: module.id,
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.css'],
    providers: []
})
export class SectionComponent {
    @ViewChild(JugadoresCargaComponent) jugadores: JugadoresCargaComponent;

}
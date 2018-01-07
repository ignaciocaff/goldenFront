import { Component, Directive, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'torneo',
    moduleId: module.id,
    templateUrl: './torneo.component.html',
    styleUrls: ['./torneo.component.css'],
    providers: []
})
export class TorneoComponent {
    constructor() {
    }

}
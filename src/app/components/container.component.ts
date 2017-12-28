import { Component, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FooterComponent } from './footer/index';
import { NavComponent } from './nav/index';
import { HeaderComponent } from './header/index';
import { SectionComponent } from './section/index';


@Component({
    selector: 'container',
    moduleId: module.id,
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.css'],
    providers: []
})
export class ContainerComponent {
    @ViewChild(FooterComponent) footer: FooterComponent;
    @ViewChild(NavComponent) nav: NavComponent;
    @ViewChild(SectionComponent) section: SectionComponent;
    @ViewChild(HeaderComponent) header: HeaderComponent;
    constructor(
        private router: Router
    ) {
    }
}
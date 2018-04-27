import { Component, Directive, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoginComponent } from '../common/login/index';
import { Subscription } from 'rxjs/Subscription';
import { AppConfig } from '../../app.config'
@Component({
    selector: 'header',
    moduleId: module.id,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: []
})
export class HeaderComponent {
    @ViewChild(LoginComponent) login: LoginComponent;

    items: Array<any> = [];
    constructor(public config: AppConfig,
        private router: Router) {
    }

    noticias_Click() {
        this.router.navigate(['home/noticias']);
    }
}

import { Component, Directive, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoginComponent } from '../common/login/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'header',
    moduleId: module.id,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: []
})
export class HeaderComponent {
    @ViewChild(LoginComponent) login: LoginComponent;
    constructor() {
    }

}
import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'configuraciones-container',
    moduleId: module.id,
    templateUrl: './configuraciones.container.component.html',
    styleUrls: ['./configuraciones.container.component.css'],
    providers: []
})
export class ConfiguracionesContainerComponent implements OnInit {


    constructor(public toastr: ToastsManager,
        private router: Router) {



    }

    ngOnInit() {
        this.router.navigate(['home/configuraciones/horarios-carga']);
    }
}
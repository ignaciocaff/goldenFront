import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'planilla-jugadores',
    moduleId: module.id,
    templateUrl: './planilla-jugadores.component.html',
    styleUrls: ['./planilla-jugadores.component.css'],
    providers: []
})
export class CanchaComponent {
    @ViewChild('canchaForm') canchaForm: FormGroup;


    constructor(toastr: ToastsManager) { }

 
}

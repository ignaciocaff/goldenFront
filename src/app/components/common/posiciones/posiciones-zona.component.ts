import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'posiciones-zona',
  moduleId: module.id,
  templateUrl: './posiciones-zona.component.html',
  styleUrls: ['./posiciones-zona.component.scss'],
  providers: []
})
export class PosicionesZonaComponent {

  constructor(
  ) {
  }
}

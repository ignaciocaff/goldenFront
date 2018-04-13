import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'posiciones-general',
  moduleId: module.id,
  templateUrl: './posiciones-general.component.html',
  styleUrls: ['./posiciones-general.component.scss'],
  providers: []
})
export class PosicionesGeneralComponent {

  constructor(
  ) {
  }
}

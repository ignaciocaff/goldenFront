import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { Posiciones, PosicionesZona } from '../../../entities/index';
import { PosicionesService } from '../../../services/entity-services/index';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AppConfig } from '../../../app.config';

@Component({
  selector: 'posiciones-general',
  moduleId: module.id,
  templateUrl: './posiciones-general.component.html',
  styleUrls: ['./posiciones-general.component.scss'],
  providers: []
})
export class PosicionesGeneralComponent implements OnInit {

  public lsPosiciones = new Array<Posiciones>();
  public posicion = new Posiciones();
  public id_fase: number;
  public lsPosicionesZona = new Array<Array<PosicionesZona>>();
  public lsNombreZonas: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];


  constructor(
    private posicionesService: PosicionesService,
    public toastr: ToastsManager,
    private spinnerService: Ng4LoadingSpinnerService,
    public config: AppConfig
  ) {
  }

  ngOnInit() {
    var id_torneo = Number(sessionStorage.getItem('id_torneo'));
    this.id_fase = Number(sessionStorage.getItem('fase'));

    console.log(this.id_fase);

    this.posicionesService.getPosicionesPorTorneo(id_torneo).subscribe(
      data => {
        if (this.id_fase == 1) {
          for (let i = 0; i < data.length; i++) {
            let posicion = new Posiciones();
            posicion = data[i];
            this.lsPosiciones.push(posicion);
          }
        } else {
          for (let i = 0; i < data.length; i++) {
            var lsPosicionZona = new Array<PosicionesZona>();
            lsPosicionZona = data[i];
            this.lsPosicionesZona.push(lsPosicionZona);
          }
        }
      },
      error => {
        error.json()['Message'];
      });
  }
}

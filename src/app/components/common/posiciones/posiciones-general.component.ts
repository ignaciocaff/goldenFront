import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Posiciones, PosicionesZona, SancionEquipo } from '../../../entities/index';
import { PosicionesService, SancionEquipoService } from '../../../services/entity-services/index';
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
  public lsSanciones = new Array<SancionEquipo>();


  constructor(
    private posicionesService: PosicionesService,
    private sancionEquipoService: SancionEquipoService,
    public config: AppConfig
  ) {
  }

  ngOnInit() {
    var id_torneo = Number(sessionStorage.getItem('id_torneo'));
    this.id_fase = Number(sessionStorage.getItem('fase'));


    this.posicionesService.getPosicionesPorTorneo(id_torneo).subscribe(
      data => {
        if (this.id_fase == 1) {
          for (let i = 0; i < data.length; i++) {
            let posicion = new Posiciones();
            posicion = data[i];
            this.lsPosiciones.push(posicion);
            this.buscarSancionesGeneral();
          }
        } else {
          for (let i = 0; i < data.length; i++) {
            var lsPosicionZona = new Array<PosicionesZona>();
            lsPosicionZona = data[i];
            this.lsPosicionesZona.push(lsPosicionZona);
            this.buscarSancionesEquiposZona(lsPosicionZona);
          }
        }
      },
      error => {
        error.json()['Message'];
      });
  }

  buscarSancionesGeneral() {
    for (let i = 0; i < this.lsPosiciones.length; i++) {
      this.sancionEquipoService.getSancionesByEquipo(this.lsPosiciones[i].equipo.id_equipo).subscribe(
        data => {
          if (data) {
            for (let j = 0; j < data.length; j++) {
              var sancion = new SancionEquipo();
              sancion = data[j];
              this.lsSanciones.push(sancion);
            }
          }
        },
        error => {
          error.json()['Message'];
        }
      );
    }
  }

  buscarSancionesEquiposZona(lista: Array<PosicionesZona>) {
    for (let i = 0; i < lista.length; i++) {
      this.sancionEquipoService.getSancionesByEquipo(lista[i].equipo.id_equipo).subscribe(
        data => {
          if (data) {
            for (let j = 0; j < data.length; j++) {
              var sancion = new SancionEquipo();
              sancion = data[j];
              this.lsSanciones.push(sancion);
            }
          }
        },
        error => {
          error.json()['Message'];
        }
      );
    }
  }
}

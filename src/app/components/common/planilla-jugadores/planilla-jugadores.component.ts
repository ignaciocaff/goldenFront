import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { EquipoService } from '../../../services/index';
import { Equipo } from '../../../entities/index';
import { FileService } from '../../../services/entity-services/file.service';
import { IEquipoPlanilla, IJugador } from '../../../entities/interfaces/index';


@Component({
  selector: 'planilla-jugadores',
  moduleId: module.id,
  templateUrl: './planilla-jugadores.component.html',
  styleUrls: ['./planilla-jugadores.component.css'],
  providers: []
})
export class PlanillaJugadoresComponent implements OnInit {

  public lsJugadores = new Array<IJugador>();
  public lsEquipos = new Array<IEquipoPlanilla>();
  imprimir: boolean = false;

  constructor(
    public toastr: ToastsManager,
    private equipoService: EquipoService,
    private fileService: FileService,
  ) {
  }


  ngOnInit() {
    var id_torneo = Number(sessionStorage.getItem('id_torneo'));

    this.equipoService.getiJugadoresPlanilla(id_torneo).subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          var equipo = new IEquipoPlanilla();
          equipo = data[i];
          this.lsEquipos.push(equipo);
        }
        this.completarEquipo();
      },
      error => {
        error.json()['Message'];
      });
  }


  completarEquipo() {
    try {
      for (let j = 0; j < this.lsEquipos.length; j++) {
        for (let i = this.lsEquipos[j].lsJugadores.length; i < 27; i++) {
          this.lsEquipos[j].lsJugadores.push(new IJugador());
        }

        for (let i = 0; i < this.lsEquipos[j].lsJugadores.length; i++) {
          if (this.lsEquipos[j].lsJugadores[i].rol == 'director_tecnico') {
            this.lsEquipos[j].lsJugadores.splice(24, 0, this.lsEquipos[j].lsJugadores[i]);
            this.lsEquipos[j].lsJugadores.splice(i, 1);
          }
          if (this.lsEquipos[j].lsJugadores[i].rol == 'representante') {
            this.lsEquipos[j].lsJugadores.splice(27, 0, this.lsEquipos[j].lsJugadores[i]);
            this.lsEquipos[j].lsJugadores.splice(i, 1);
          }
        }
      }
      this.imprimir = true;
    } catch (exception) {
    }
  }


  imprimirPDF(): void {
    let printContents, popupWin;
    printContents = document.getElementById('planilla').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
          <html>
            <head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
              <title></title>
              <style>              
              .planilla {
                margin-bottom: 300px;
              }

              .declaracion {
                border: 3px solid black;
                margin: 15px;
              }
              
              .titulo {
                font-weight: bold;
                font-size: 15px;
                text-align: center;
                margin: 0 auto;
              }
              
              .texto-declaracion {
                font-size: 10px;
                text-align: justify;
                border-bottom: 1px solid black;
                margin-left: 2px;
              }
              
              .datos {
                font-size: 15px;
                text-align: center;
                font-weight: bold;
              }
              
              .jugadores {
                /* border: 3px dotted purple; */
                margin-left: 15px;
                margin-right: 15px;
              }
              
              .jugador {
                /* border: 2px dotted black; */
                width: 331px;
                height: 100px;
                margin-bottom: 10px;
              }
              
              .foto {
                width: 140px;
                height: 100px;
                margin: 0px;
                padding: 0px;
                position: relative;
              }
              
              .foto img {
                width: 140px;
                height: 100px;
              }
              
              .texto-imagen {
                position: absolute;
                bottom: 0px;
                left: 0px;
                font-size: 10px;
                text-align: center;
                font-weight: bold;
                color: white;
                background-color: rgba(0 , 0, 0 , 0.2);
                width: 140px;
              }
              
              .llenado {
                background-color: rgb(222, 222, 222);
                height: 100px;
              }

              .llenado-dt {
                background-color: rgb(224,200,138);
                height: 100px;
              }
              
              .resultado {
                border: 2px solid rgb(170, 145, 93);
                height: 100px;
                background-color: rgb(222, 222, 222);
              }
              
              .num {
                font-weight: bold;
                text-align: left;
                font-size: 12px;
                height: 22px;
              }

              .dt {
                margin: 0 auto;
                font-weight: bold;
                font-size: 9px;
                height: 22px;
                text-align: center;
              }

              .rep {
                margin: 0 auto;
                font-weight: bold;
                font-size: 10px;
                height: 22px;
                text-align: center;
              }

              .enblanco{
                height: 54px;
              }
              
              .firma {
                font-weight: bold;
                font-size: 12px;
                text-align: justify;
                height: 22px;
                border-top: 1px solid black;
              }
              
              .sancion {
                height: 22px;
              }

              .sancion-dt {
                height: 22px;
                background-color: rgb(224,200,138);
              }
              
              .amarilla {
                border-bottom: 2px solid rgb(170, 145, 93);
                border-top: 2px solid rgb(170, 145, 93);
                background-color: rgb(220, 200, 44);
                height: 22px;
              }
              
              .amarilla-dt {
                border-bottom: 2px solid rgb(170, 145, 93);
                border-top: 2px solid rgb(170, 145, 93);
                background-color: rgb(224,200,138);
                height: 22px;
              }
              
              .roja {
                border-bottom: 2px solid rgb(170, 145, 93);
                background-color: rgb(190, 5, 24);
                height: 22px;
              }
              
              .gol {
                height: 34px;
              }

              .gol img {
                max-height: 30px;
                max-width: auto;  
                margin-left: 10px;
                opacity: 0.3;
                filter: alpha(opacity=30);
              }

              .gol-dt {
                height: 30px;
                background-color: rgb(224, 200, 138);
              }
              
              .footer {
                border: 3px solid black;
                margin: 15px;
              }

              @media print {
                .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {
                     float: left;
                }
                .col-sm-12 {
                     width: 100%;
                }
                .col-sm-11 {
                     width: 91.66666667%;
                }
                .col-sm-10 {
                     width: 83.33333333%;
                }
                .col-sm-9 {
                     width: 75%;
                }
                .col-sm-8 {
                     width: 66.66666667%;
                }
                .col-sm-7 {
                     width: 58.33333333%;
                }
                .col-sm-6 {
                     width: 50%;
                }
                .col-sm-5 {
                     width: 41.66666667%;
                }
                .col-sm-4 {
                     width: 33.33333333%;
                }
                .col-sm-3 {
                     width: 25%;
                }
                .col-sm-2 {
                     width: 16.66666667%;
                }
                .col-sm-1 {
                     width: 8.33333333%;
                }
             }
            </style>
            </head>
        <body onload="window.print();window.close()">${printContents}</body>
          </html>`
    );
    popupWin.document.close();
  }
}

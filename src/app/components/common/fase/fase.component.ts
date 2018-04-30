import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {
    Fase
} from '../../../entities/index';
import { TorneoService } from '../../../services/entity-services/index';
import { ToastsManager, Toast, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'fase',
    moduleId: module.id,
    templateUrl: './fase.component.html',
    styleUrls: ['./fase.component.css'],
    providers: []
})
export class FaseComponent {
    @ViewChild('faseForm') faseForm: FormGroup;

    id_fase: number;
    lsFases = new Array<any>();
    id_torneo: number;
    faseNombre: string = 'Primera fase zonas';
    fase: Fase;
    mensaje: string = 'El campeonato se encuentra en la fase: ';
    constructor(public toastr: ToastsManager,
        private router: Router,
        private spinnerService: Ng4LoadingSpinnerService,
        private torneoService: TorneoService) {
        this.id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.id_fase = Number(sessionStorage.getItem('fase'));
        this.lsFases.push({ id_fase: 1, descripcion: 'Primera Fase' });
        this.lsFases.push({ id_fase: 2, descripcion: 'Segunda Fase' });
        this.lsFases.push({ id_fase: 3, descripcion: 'PlayOff' });

        if (this.id_fase == 1) {
            this.lsFases.splice(0, 1);
        }
        else if (this.id_fase == 2) {
            this.lsFases.splice(0, 2);
            this.faseNombre = 'Segunda fase zonas';
        } else if (this.id_fase == 3) {
            // Ya no puede cambiar de fase.
            this.mensaje = 'No es posible cambiar de fase, esta en la etapa final del campeonato: ';
            this.faseNombre = 'Playoff';
        }
    }


    cambiarFase() {
        this.torneoService.cambioFase(this.fase, this.id_torneo).subscribe(
            data => {
                this.toastr.success('La fase ha sido modificada correctamente', 'Éxito!');
                window.location.reload();
            }, error => {
                this.toastr.error('Intente nuevamente más tarde', 'Error!');
            }
        );
    }
    limpiarCampos() {
    }
}

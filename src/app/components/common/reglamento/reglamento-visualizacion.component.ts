import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Usuario, Reglamento } from '../../../entities/index';
import { ReglasService } from '../../../services/index';


@Component({
    selector: 'reglamento-visualizacion',
    moduleId: module.id,
    templateUrl: './reglamento-visualizacion.component.html',
    styleUrls: ['./reglamento-visualizacion.component.scss'],
    providers: []
})

export class ReglamentoVisualizacionComponent implements OnInit {
    public reglamento = new Reglamento();

    esAdmin: boolean = false;
    user: Usuario;

    constructor( private reglasService: ReglasService ) {  }

    ngOnInit() {
        this.reglamento.id_torneo = Number(sessionStorage.getItem('id_torneo'));
        this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        if (this.user != null) {
            if (this.user.perfil.id_perfil == 1) {
                this.esAdmin = true;
            }
        }

        this.reglasService.getReglamento(this.reglamento.id_torneo).subscribe(
            data => {
                this.reglamento = data;
            },
            error => {
                this.reglamento = new Reglamento();
                error.json()['Message'];
            }
        );
    }
}



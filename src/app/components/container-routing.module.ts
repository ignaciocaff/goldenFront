import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerComponent } from './index';

import {
    JugadoresCargaComponent, JugadoresUpdateComponent
} from './common/jugadores/index';
import {
    TorneoComponent, TorneoUpdateComponent
} from './common/torneo/index';
import { EquipoComponent, EquipoUpdateComponent } from './common/equipo/index';
import {
    ConfiguracionesContainerComponent
} from './common/configuraciones/index';
import { SectionComponent } from './section/index';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { NoticiaCargaComponent } from './common/noticia/index';
import { CanchaComponent, CanchaUpdateComponent } from "./common/canchas/index";
import { HomeComponent } from './home/index';
import { NoticiaVisualizacionComponent } from './common/noticia/noticia-visualizacion.component';
import { ReglasComponent, ReglasUpdateComponent } from './common/reglas/index';

const homeRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home/noticias' },
    {
        path: 'home', component: ContainerComponent,
        children: [
            {
                path: 'jugadores-carga', component: JugadoresCargaComponent,
            },
            {
                path: 'jugadores-update', component: JugadoresUpdateComponent,
            },
            {
                path: 'torneo-carga', component: TorneoComponent,
            },
            {
                path: 'torneo-update', component: TorneoUpdateComponent,
            },
            {
                path: 'equipo-carga', component: EquipoComponent,
            },
            {
                path: 'equipo-update', component: EquipoUpdateComponent,
            },
            {
                path: 'configuraciones', component: ConfiguracionesContainerComponent,
            },
            {
                path: 'noticia-carga', component: NoticiaCargaComponent,
            },
            {
                path: 'canchas', component: CanchaComponent,
            },
            {
                path: 'canchas-update', component: CanchaUpdateComponent,
            },
            {
                path: 'noticias', component: HomeComponent,
            },
            {
                path: 'noticia/:id', component: NoticiaVisualizacionComponent,
            },
            {
                path: 'reglas', component: ReglasComponent,
            },
            {
                path: 'reglas-update', component: ReglasUpdateComponent,
            }
        ]
    },
    // { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule { }
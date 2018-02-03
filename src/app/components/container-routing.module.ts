import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerComponent } from './index';

import {
    JugadoresCargaComponent
} from './common/jugadores/index';
import {
    TorneoComponent, TorneoUpdateComponent
} from './common/torneo/index';
import { EquipoComponent } from './common/equipo/index';
import {
    ConfiguracionesContainerComponent
} from './common/configuraciones/index';
import { SectionComponent } from './section/index';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { NoticiaCargaComponent } from './common/noticia/index';
import { HomeComponent } from './home/index';
import { NoticiaVisualizacionComponent } from './common/noticia/noticia-visualizacion.component';

const homeRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home/noticias' },
    {
        path: 'home', component: ContainerComponent,
        children: [
            {
                path: 'jugadores-carga', component: JugadoresCargaComponent,
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
                path: 'configuraciones', component: ConfiguracionesContainerComponent,
            },
            {
                path: 'noticia-carga', component: NoticiaCargaComponent,
            },
            {
                path: 'noticias', component: HomeComponent,
            },
            {
                path: 'noticia/:id', component: NoticiaVisualizacionComponent,
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
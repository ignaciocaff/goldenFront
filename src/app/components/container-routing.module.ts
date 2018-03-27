import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerComponent } from './index';

import {
    JugadoresCargaComponent
} from './common/jugadores/index';
import {
    TorneoComponent, TorneoUpdateComponent
} from './common/torneo/index';
import { EquipoComponent, EquipoUpdateComponent } from './common/equipo/index';
import {
    ConfiguracionesContainerComponent
} from './common/configuraciones/index';
import { ZonaComponent, ZonaUpdateComponent } from './common/zona/index';
import { SectionComponent } from './section/index';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { NoticiaCargaComponent } from './common/noticia/index';
import { CanchaComponent, CanchaUpdateComponent } from "./common/canchas/index";
import { HomeComponent } from './home/index';
import { NoticiaVisualizacionComponent } from './common/noticia/noticia-visualizacion.component';
import { HorariosComponent, HorariosUpdateComponent } from './common/horarios/index';

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
                path: 'equipo-update', component: EquipoUpdateComponent,
            },
            {
                path: 'configuraciones', component: ConfiguracionesContainerComponent,
                children: [
                    { path: 'horarios-carga', component: HorariosComponent },
                    { path: 'horarios-update', component: HorariosUpdateComponent },
                    { path: 'canchas', component: HorariosComponent },
                    { path: 'sponsors', component: HorariosComponent },
                    { path: 'reglas', component: HorariosComponent },
                    { path: 'reglamento', component: HorariosComponent },
                    { path: 'planilla', component: HorariosComponent },
                    { path: 'visualizacion', component: HorariosComponent }
                ]
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
                path: 'zona-carga', component: ZonaComponent,
            },
            {
                path: 'zona-update', component: ZonaUpdateComponent,
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
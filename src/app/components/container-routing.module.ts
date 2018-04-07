import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerComponent } from './index';

import {
    JugadoresCargaComponent, JugadoresUpdateComponent
} from './common/jugadores/index';
import {
    TorneoComponent, TorneoUpdateComponent
} from './common/torneo/index';
import { EquipoComponent, EquipoUpdateComponent, EquiposTorneoComponent, EquipoVisualizacionComponent } from './common/equipo/index';
import {
    ConfiguracionesContainerComponent
} from './common/configuraciones/index';
import { ZonaComponent, ZonaUpdateComponent, ZonaDeleteComponent } from './common/zona/index';
import { SectionComponent } from './section/index';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { NoticiaCargaComponent } from './common/noticia/index';
import { CanchaComponent, CanchaUpdateComponent } from "./common/canchas/index";
import { HomeComponent } from './home/index';
import { NoticiaVisualizacionComponent } from './common/noticia/noticia-visualizacion.component';
import { ReglasComponent, ReglasUpdateComponent } from './common/reglas/index';
import { PlanillaJugadoresComponent } from './common/planilla-jugadores/index';
import { ReglamentoCargaComponent, ReglamentoVisualizacionComponent } from './common/reglamento/index';

import { HorariosComponent, HorariosUpdateComponent } from './common/horarios/index';
import { FixtureComponent, FixtureUpdateComponent, FixtureUpdateFechaComponent } from "./common/fixture/index";
import { ResultadoComponent } from "./common/resultado/index";

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
                children: [
                    { path: 'horarios-carga', component: HorariosComponent },
                    { path: 'horarios-update', component: HorariosUpdateComponent },
                    { path: 'canchas', component: HorariosComponent },
                    { path: 'sponsors', component: HorariosComponent },
                    { path: 'reglas', component: ReglasComponent },
                    { path: 'reglas-update', component: ReglasUpdateComponent },
                    { path: 'reglamento', component: ReglamentoCargaComponent },
                    { path: 'planilla', component: PlanillaJugadoresComponent },
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
            },
            {
                path: 'zona-delete', component: ZonaDeleteComponent,
            },
            {
                path: 'fixture-armado', component: FixtureComponent,
            },
            {
                path: 'fixture-update', component: FixtureUpdateComponent,
            },
            {
                path: 'fixture-update-fecha', component: FixtureUpdateFechaComponent,
            },
            {
                path: 'resultado-carga', component: ResultadoComponent,
            },
            {
                path: 'equipos', component: EquiposTorneoComponent,
            },
            {
                path: 'equipo/:id', component: EquipoVisualizacionComponent,
            },
            {
                path: 'reglamento', component: ReglamentoVisualizacionComponent,
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
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
import { ResultadoUpdateComponent } from "./common/resultado/update/index";
import { HorariosComponent, HorariosUpdateComponent } from './common/horarios/index';
import { FixtureComponent, FixtureUpdateComponent, FixtureUpdateFechaComponent } from "./common/fixture/index";
import { ResultadoComponent } from "./common/resultado/index";
import { PosicionesGeneralComponent, GoleadoresComponent } from "./common/posiciones/index";
import { UsuarioComponent, UsuarioBajaComponent } from './common/usuarios/index';
import { SancionEquipoCargaComponent, SancionEquipoBajaComponent } from './common/sanciones-equipo/index';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { CanActivateRouteGuardRepre } from './can-activate-route.guard.rep';
import { FixtureVisualizacionComponent } from './common/fixture-visualizacion/index';

const homeRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home/noticias' },
    {
        path: 'home', component: ContainerComponent,
        children: [
            {
                path: 'jugadores-carga', component: JugadoresCargaComponent,
                canActivate: [CanActivateRouteGuardRepre]
            },
            {
                path: 'jugadores-update', component: JugadoresUpdateComponent,
                canActivate: [CanActivateRouteGuardRepre]
            },
            {
                path: 'torneo-carga', component: TorneoComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'torneo-update', component: TorneoUpdateComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'equipo-carga', component: EquipoComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'equipo-update', component: EquipoUpdateComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'configuraciones', component: ConfiguracionesContainerComponent,
                canActivate: [CanActivateRouteGuard],
                children: [
                    { path: 'horarios-carga', component: HorariosComponent },
                    { path: 'horarios-update', component: HorariosUpdateComponent },
                    { path: 'sponsors', component: HorariosComponent },
                    { path: 'reglas', component: ReglasComponent },
                    { path: 'reglas-update', component: ReglasUpdateComponent },
                    { path: 'reglamento', component: ReglamentoCargaComponent },
                    { path: 'planilla', component: PlanillaJugadoresComponent },
                    { path: 'visualizacion', component: HorariosComponent },
                    { path: 'canchas', component: CanchaComponent },
                    { path: 'canchas-update', component: CanchaUpdateComponent },
                    { path: 'sanciones-equipo-carga', component: SancionEquipoCargaComponent },
                    { path: 'sanciones-equipo-baja', component: SancionEquipoBajaComponent },

                ]
            },
            {
                path: 'noticia-carga', component: NoticiaCargaComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'noticias', component: HomeComponent,
            },
            {
                path: 'noticia/:id', component: NoticiaVisualizacionComponent,
            },
            {
                path: 'zona-carga', component: ZonaComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'zona-update', component: ZonaUpdateComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'zona-delete', component: ZonaDeleteComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'fixture-armado', component: FixtureComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'fixture-update', component: FixtureUpdateComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'fixture-update-fecha', component: FixtureUpdateFechaComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'resultado-carga', component: ResultadoComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'resultado-update', component: ResultadoUpdateComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'equipos', component: EquiposTorneoComponent,
            },
            {
                path: 'equipo/:id', component: EquipoVisualizacionComponent,
            },
            {
                path: 'reglamento', component: ReglamentoVisualizacionComponent,
            },
            {
                path: 'posiciones', component: PosicionesGeneralComponent,
            },
            {
                path: 'goleadores', component: GoleadoresComponent,
            },
            {
                path: 'fixture', component: FixtureVisualizacionComponent,
            },
            {
                path: 'usuarios', component: UsuarioComponent,
                canActivate: [CanActivateRouteGuard]
            },
            {
                path: 'usuarios-baja', component: UsuarioBajaComponent,
                canActivate: [CanActivateRouteGuard]
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
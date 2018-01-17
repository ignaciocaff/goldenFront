import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerComponent } from './index';

import {
    JugadoresCargaComponent
} from './common/jugadores/index';
import {
    TorneoComponent
} from './common/torneo/index';
import {
    ConfiguracionesComponent
} from './common/configuraciones/index';
import { SectionComponent } from './section/index';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';

const homeRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
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
                path: 'configuraciones', component: ConfiguracionesComponent,
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
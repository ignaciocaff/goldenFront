import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerComponent } from './index';

import {
    JugadoresCargaComponent
} from './common/jugadores/index';
import { SectionComponent } from './section/index';

const homeRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    {
        path: 'home', component: ContainerComponent,
        children: [
            { path: 'jugadores-carga', component: JugadoresCargaComponent },
        ]
    },
    //{ path: '**', component: HomeComponent }
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
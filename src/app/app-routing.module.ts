import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './components/index';
import { CanActivateRouteGuard } from './components/can-activate-route.guard';
const appRoutes: Routes = [
    { path: '', component: ContainerComponent, canActivate: [CanActivateRouteGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: 'home/noticias' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
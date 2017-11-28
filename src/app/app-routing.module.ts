import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './components/index';

const appRoutes: Routes = [
    { path: 'home', component: ContainerComponent, /*canActivate: [AuthGuard]*/ },

    // otherwise redirect to home
    { path: '**', redirectTo: '/home' }
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
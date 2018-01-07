import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header/index';
import { NavComponent } from './nav/index';
import { AsideComponent } from './aside/index';
import { SectionComponent } from './section/index';
import { FooterComponent } from './footer/index';
import { MatMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JugadoresCargaComponent } from './common/jugadores/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './container-routing.module';
import { LoginComponent, LoginCargaComponent } from './common/login/index'
import { TorneoComponent } from './common/torneo/index';


@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    AsideComponent,
    SectionComponent,
    FooterComponent,
    JugadoresCargaComponent,
    TorneoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  providers: [],
  exports: [HeaderComponent, NavComponent, AsideComponent, SectionComponent,
    FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ContainerModule { }

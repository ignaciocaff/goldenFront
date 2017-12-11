import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header/index';
import { NavComponent } from './nav/index';
import { AsideComponent } from './aside/index';
import { SectionComponent } from './section/index';
import { FooterComponent } from './footer/index';
import { MatMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JugadoresCargaComponent } from './common/jugadores/index';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './container-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    AsideComponent,
    SectionComponent,
    FooterComponent,
    JugadoresCargaComponent
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    HomeRoutingModule
  ],
  providers: [],
  exports: [HeaderComponent, NavComponent, AsideComponent, SectionComponent, FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContainerModule { }

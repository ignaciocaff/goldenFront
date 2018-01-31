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
import { LoginComponent, LoginCargaComponent } from './common/login/index';
import { EscudosComponent } from './common/escudos-bar/index';
import { TorneoComponent } from './common/torneo/index';
import { EquipoComponent } from './common/equipo/index';

import { MultiSelectModule } from 'primeng/primeng';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { ConfiguracionesContainerComponent } from './common/configuraciones/index';
import { FileUploadComponent } from './common/configuraciones/file-upload/index';
import { FileService } from '../services/entity-services/file.service';
import { CategoriaService, TorneoService, ClubService, EquipoService } from '../services/index';
import { NoticiaCargaComponent } from './common/noticia/index';
import { CategoriaNoticiaService } from '../services/entity-services/index';


@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    AsideComponent,
    SectionComponent,
    FooterComponent,
    JugadoresCargaComponent,
    TorneoComponent,
    LoginComponent,
    TorneoComponent,
    EquipoComponent,
    EscudosComponent,
    ConfiguracionesContainerComponent,
    FileUploadComponent,
    NoticiaCargaComponent
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MultiSelectModule,
    AngularMultiSelectModule,
    AngularFontAwesomeModule,
    Ng2CarouselamosModule
  ],
  providers: [FileService, TorneoService, ClubService, CategoriaService, EquipoService, CategoriaNoticiaService],
  exports: [HeaderComponent, NavComponent, AsideComponent, SectionComponent,
    FooterComponent, EscudosComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ContainerModule { }

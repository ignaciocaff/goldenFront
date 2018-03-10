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
import { TorneoComponent, TorneoUpdateComponent } from './common/torneo/index';
import { EquipoComponent } from './common/equipo/index';

import { MultiSelectModule } from 'primeng/primeng';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { ConfiguracionesContainerComponent } from './common/configuraciones/index';
import { FileUploadComponent } from './common/configuraciones/file-upload/index';
import { FileService } from '../services/entity-services/file.service';
import { TorneoEmitter, TorneoLSEmitter } from '../services/common-services/index'
import { CategoriaService, TorneoService, ClubService, EquipoService } from '../services/index';
import { ConfirmationDialog } from './common/dialog/index';
import { NoticiaCargaComponent } from './common/noticia/index';
import { CategoriaNoticiaService, NoticiaService } from '../services/entity-services/index';
import { CKEditorModule } from 'ngx-ckeditor';
import { CKEDITOR_VALUE_ACCESSOR } from 'ngx-ckeditor/lib/ck-editor.component';
import { HomeComponent } from './home/index';
import { NoticiaVisualizacionComponent } from './common/noticia/noticia-visualizacion.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    AsideComponent,
    SectionComponent,
    FooterComponent,
    JugadoresCargaComponent,
    TorneoComponent,
    TorneoUpdateComponent,
    LoginComponent,
    TorneoComponent,
    EquipoComponent,
    EscudosComponent,
    ConfiguracionesContainerComponent,
    FileUploadComponent,
    ConfirmationDialog,
    NoticiaCargaComponent,
    HomeComponent,
    NoticiaVisualizacionComponent
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
    Ng2CarouselamosModule,
    CKEditorModule
  ],
  entryComponents: [ConfirmationDialog],
  providers: [FileService, TorneoService, ClubService, CategoriaService, EquipoService, CategoriaNoticiaService,
              TorneoEmitter, TorneoLSEmitter, NoticiaService],
  exports: [HeaderComponent, NavComponent, AsideComponent, SectionComponent,
    FooterComponent, EscudosComponent, HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ContainerModule { }

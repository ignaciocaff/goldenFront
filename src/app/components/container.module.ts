import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header/index';
import { NavComponent } from './nav/index';
import { AsideComponent } from './aside/index';
import { SectionComponent } from './section/index';
import { FooterComponent } from './footer/index';
import { MatMenuModule, MatInputModule, MatPaginatorModule, MatPaginatorIntl, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JugadoresCargaComponent } from './common/jugadores/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './container-routing.module';
import { LoginComponent, LoginCargaComponent } from './common/login/index';
import { EscudosComponent } from './common/escudos-bar/index';
import { TorneoComponent, TorneoUpdateComponent } from './common/torneo/index';
import { EquipoComponent, EquipoUpdateComponent } from './common/equipo/index';
import { ZonaComponent, ZonaUpdateComponent } from './common/zona/index';
import { HorariosComponent, HorariosUpdateComponent } from './common/horarios/index';

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
import { CategoriaNoticiaService, NoticiaService, CanchaService, HorarioService } from '../services/entity-services/index';
import { CKEditorModule } from 'ngx-ckeditor';
import { CKEDITOR_VALUE_ACCESSOR } from 'ngx-ckeditor/lib/ck-editor.component';
import { HomeComponent } from './home/index';
import { NoticiaVisualizacionComponent } from './common/noticia/noticia-visualizacion.component';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { getCustomPaginator } from './common/paginator/index';
import { CanchaComponent, CanchaUpdateComponent } from './common/canchas/index';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

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
    EquipoUpdateComponent,
    EscudosComponent,
    ConfiguracionesContainerComponent,
    FileUploadComponent,
    ConfirmationDialog,
    NoticiaCargaComponent,
    HomeComponent,
    NoticiaVisualizacionComponent,
    CanchaComponent,
    CanchaUpdateComponent,
    ZonaComponent,
    ZonaUpdateComponent,
    HorariosComponent,
    HorariosUpdateComponent
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
    CKEditorModule,
    MatTableModule,
    CdkTableModule,
    MatInputModule,
    MatPaginatorModule,
    NgxDnDModule
  ],
  entryComponents: [ConfirmationDialog],
  providers: [FileService, TorneoService, ClubService, CategoriaService, EquipoService, CategoriaNoticiaService,
    TorneoEmitter, TorneoLSEmitter, NoticiaService, { provide: MatPaginatorIntl, useValue: getCustomPaginator() }, CanchaService, HorarioService],
  exports: [HeaderComponent, NavComponent, AsideComponent, SectionComponent,
    FooterComponent, EscudosComponent, HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ContainerModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header/index';
import { NavComponent } from './nav/index';
import { AsideComponent } from './aside/index';
import { SectionComponent } from './section/index';
import { FooterComponent } from './footer/index';
import { MatMenuModule, MatInputModule, MatPaginatorModule, MatPaginatorIntl, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JugadoresCargaComponent, JugadoresUpdateComponent } from './common/jugadores/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './container-routing.module';
import { LoginComponent, LoginCargaComponent } from './common/login/index';
import { EscudosComponent } from './common/escudos-bar/index';
import { TorneoComponent, TorneoUpdateComponent } from './common/torneo/index';
import { EquipoComponent, EquipoUpdateComponent, EquiposTorneoComponent, EquipoVisualizacionComponent } from './common/equipo/index';
import { ZonaComponent, ZonaUpdateComponent, ZonaDeleteComponent } from './common/zona/index';
import { HorariosComponent, HorariosUpdateComponent } from './common/horarios/index';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MultiSelectModule } from 'primeng/primeng';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { ConfiguracionesContainerComponent } from './common/configuraciones/index';
import { FileUploadComponent } from './common/configuraciones/file-upload/index';
import { FileService } from '../services/entity-services/file.service';
import { TorneoEmitter, TorneoLSEmitter, ParserService } from '../services/common-services/index'
import { CategoriaService, TorneoService, ClubService, EquipoService, ReglasService } from '../services/index';
import { ConfirmationDialog } from './common/dialog/index';
import { NoticiaCargaComponent } from './common/noticia/index';
import {
  CategoriaNoticiaService, NoticiaService, CanchaService,
  HorarioService, FixtureService, ReglaTorneoService, SancionEquipoService, SancionService, PartidoService, PosicionesService
} from '../services/entity-services/index';
import { CKEditorModule } from 'ngx-ckeditor';
import { CKEDITOR_VALUE_ACCESSOR } from 'ngx-ckeditor/lib/src/ck-editor.component';
import { HomeComponent } from './home/index';
import { NoticiaVisualizacionComponent } from './common/noticia/noticia-visualizacion.component';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { getCustomPaginator } from './common/paginator/index';
import { CanchaComponent, CanchaUpdateComponent } from './common/canchas/index';
import { ReglasComponent, ReglasUpdateComponent } from './common/reglas/index';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { LocalidadesCargaComponent } from './common/localidades';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { FixtureComponent, FixtureUpdateComponent, FixtureDialog, FixtureUpdateFechaComponent } from "./common/fixture/index";
import { FixtureInterzonalComponent } from "./common/fixture/interzonal/index";

import { ResultadoComponent, SancionDialog, SancionDialogV } from "./common/resultado/index";
import { ResultadoUpdateComponent } from "./common/resultado/update/index";
import { PlanillaJugadoresComponent } from './common/planilla-jugadores';
import { UsuarioComponent, UsuariosDialog, UsuarioBajaComponent } from './common/usuarios/index';
import { ReglamentoCargaComponent, ReglamentoVisualizacionComponent } from './common/reglamento/index';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { PosicionesGeneralComponent, GoleadoresComponent } from './common/posiciones/index';
import { SlickModule } from 'ngx-slick';
import { SancionEquipoCargaComponent, SancionEquipoBajaComponent } from './common/sanciones-equipo/index';
import { CanActivateRouteGuard } from './can-activate-route.guard'
import { CanActivateRouteGuardRepre } from './can-activate-route.guard.rep'
@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    AsideComponent,
    SectionComponent,
    FooterComponent,
    JugadoresCargaComponent,
    JugadoresUpdateComponent,
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
    ReglasComponent,
    ReglasUpdateComponent,
    LocalidadesCargaComponent,
    ZonaComponent,
    ZonaUpdateComponent,
    ZonaDeleteComponent,
    HorariosComponent,
    HorariosUpdateComponent,
    FixtureUpdateComponent,
    FixtureDialog,
    FixtureUpdateFechaComponent,
    ResultadoComponent,
    PlanillaJugadoresComponent,
    FixtureComponent,
    EquiposTorneoComponent,
    EquipoVisualizacionComponent,
    ReglamentoCargaComponent,
    ReglamentoVisualizacionComponent,
    PosicionesGeneralComponent,
    UsuarioComponent,
    UsuariosDialog,
    UsuarioBajaComponent,
    SancionDialog,
    SancionDialogV,
    SancionEquipoCargaComponent,
    SancionEquipoBajaComponent,
    ResultadoUpdateComponent,
    GoleadoresComponent,
    FixtureInterzonalComponent
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
    NgxDnDModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ShareButtonsModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    SlickModule.forRoot()
  ],
  entryComponents: [ConfirmationDialog, FixtureDialog, UsuariosDialog, SancionDialog, SancionDialogV],
  providers: [FileService, TorneoService, ClubService, CategoriaService, EquipoService, CategoriaNoticiaService,
    TorneoEmitter, TorneoLSEmitter, NoticiaService, { provide: MatPaginatorIntl, useValue: getCustomPaginator() },
    CanchaService, HorarioService, ParserService, FixtureService, ReglaTorneoService, HorarioService, ReglasService, SancionService
    , PartidoService, SancionEquipoService, PosicionesService, CanActivateRouteGuard, CanActivateRouteGuardRepre],
  exports: [HeaderComponent, NavComponent, AsideComponent, SectionComponent,
    FooterComponent, EscudosComponent, HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ContainerModule { }

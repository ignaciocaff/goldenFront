import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerModule, ContainerComponent } from './components/index';
import { ImageUploadModule } from 'angular2-image-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent, LoginCargaComponent } from './components/common/login/index';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { AuthenticationService } from './services/index';
import { AppConfig } from './app.config';
import { ToastOptions } from 'ng2-toastr';
import { CustomToastOption, SharedService } from './services/index';
import { MultiSelectModule } from 'primeng/primeng';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { CKEditorModule } from 'ngx-ckeditor';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LocalidadesCargaComponent } from './components/common/localidades/index';
import { CanActivateRouteGuard } from './components/can-activate-route.guard'

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    LoginCargaComponent
  ],
  imports: [
    BrowserModule,
    ContainerModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    AngularMultiSelectModule,
    AngularFontAwesomeModule,
    Ng2CarouselamosModule,
    CKEditorModule,
    ToastModule.forRoot(),
    ImageUploadModule.forRoot(),
    AppRoutingModule,
    MatTableModule,
    CdkTableModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [AuthenticationService, AppConfig, SharedService, CanActivateRouteGuard,
    {
      provide: ToastOptions,
      useClass: CustomToastOption
    }],
  entryComponents: [
    LoginCargaComponent,
    LocalidadesCargaComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

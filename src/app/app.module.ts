import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerModule, ContainerComponent } from './components/index';
import { ImageUploadModule } from 'angular2-image-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent, LoginCargaComponent } from './components/common/login/index';
import { BlockUIModule } from 'ng-block-ui';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { AuthenticationService } from './services/index';
import { AppConfig } from './app.config';
import { ToastOptions } from 'ng2-toastr';
import { CustomToastOption, SharedService } from './services/index';
import { MultiSelectModule } from 'primeng/primeng';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

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
    BlockUIModule,
    MultiSelectModule,
    AngularMultiSelectModule,
    AngularFontAwesomeModule,
    Ng2CarouselamosModule,
    ToastModule.forRoot(),
    ImageUploadModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AuthenticationService, AppConfig, SharedService,
    {
      provide: ToastOptions,
      useClass: CustomToastOption
    }],
  entryComponents: [
    LoginCargaComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerModule, ContainerComponent } from './components/index';
import { ImageUploadModule } from "angular2-image-upload";
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent, LoginCargaComponent } from './components/common/login/index'
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
    ImageUploadModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  entryComponents: [
    LoginCargaComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

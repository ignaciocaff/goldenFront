import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerModule, ContainerComponent } from './components/index';
import { ImageUploadModule } from "angular2-image-upload";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    ContainerModule,
    FormsModule,
    ImageUploadModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

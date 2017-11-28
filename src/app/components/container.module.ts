import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/index';
import { NavComponent } from './nav/index'
import { AsideComponent } from './aside/index'
import { SectionComponent } from './section/index'
import { FooterComponent } from './footer/index'
@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    AsideComponent,
    SectionComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  exports: [HeaderComponent, NavComponent, AsideComponent, SectionComponent, FooterComponent]
})
export class ContainerModule { }

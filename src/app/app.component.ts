import { Component, ViewChild } from '@angular/core';
import { ContainerComponent } from './components/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ContainerComponent) container: ContainerComponent;
  title = 'app';
}

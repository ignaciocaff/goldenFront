import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ContainerComponent } from './components/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ContainerComponent) container: ContainerComponent;
  title = 'app';

  constructor(public toastr: ToastsManager, vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }
}
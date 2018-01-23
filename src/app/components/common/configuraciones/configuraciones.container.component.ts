import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FileService } from '../../../services/entity-services/file.service';

@Component({
    selector: 'configuraciones-container',
    moduleId: module.id,
    templateUrl: './configuraciones.container.component.html',
    styleUrls: ['./configuraciones.container.component.css'],
    providers: []
})
export class ConfiguracionesContainerComponent implements OnInit {

    title = 'Image Gallery';
    errorMessage: string;
    images: Array<any> = [];

    constructor(private fileService: FileService) { }

    ngOnInit() {
        this.getImageData();
    }

    getImageData() {
        this.fileService.getImages().subscribe(

            data => { this.images = data.result; },
            error => this.errorMessage = error
        );
    }

    refreshImages(status) {
        if (status == true) {
            console.log('Uploaded successfully!');
            this.getImageData();
        }
    }
}

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

    errorMessage: string;
    images: Array<any> = [];
    arraySubidas: Array<any> = [];
    params: string;

    constructor(private fileService: FileService) { }

    ngOnInit() {
    }

    getImageData() {
        var subidas = (localStorage.getItem('subidas'));
        this.arraySubidas = JSON.parse(subidas);
        this.fileService.getImages(this.arraySubidas).subscribe(
            data => {
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        this.images.push(data[i]);
                    }

                }
                console.error(this.images);
            },
            error => this.errorMessage = error
        );
    }

    refreshImages(status) {
        if (status == true) {
            console.log('Uploaded successfully!');
            this.images = [];
            this.getImageData();
        }
    }
}

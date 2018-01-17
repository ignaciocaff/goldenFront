import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { FileService } from '../../../services/entity-services/file.service';

@Component({
    selector: 'configuraciones',
    moduleId: module.id,
    templateUrl: './configuraciones.component.html',
    styleUrls: ['./configuraciones.component.css'],
    providers: [FileService]
})
export class ConfiguracionesComponent implements OnInit {

    errors: Array<String> = [];
    dragAreaClass: String = 'dragarea';
    @Input() projectId: Number = 0;
    @Input() sectionId: Number = 0;
    @Input() fileExt: String = 'JPG, GIF, PNG';
    @Input() maxFiles: Number = 5;
    @Input() maxSize: Number = 5; // 5MB
    @Output() uploadStatus = new EventEmitter();

    constructor(private fileService: FileService) { }

    ngOnInit() { }

    onFileChange(event) {
        const files = event.target.files;
        this.saveFiles(files);
    }

    @HostListener('dragover', ['$event']) onDragOver(event) {
        this.dragAreaClass = 'droparea';
        event.preventDefault();
    }

    @HostListener('dragenter', ['$event']) onDragEnter(event) {
        this.dragAreaClass = 'droparea';
        event.preventDefault();
    }

    @HostListener('dragend', ['$event']) onDragEnd(event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
    }
    @HostListener('dragleave', ['$event']) onDragLeave(event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
    }
    @HostListener('drop', ['$event']) onDrop(event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        this.saveFiles(files);
    }

    saveFiles(files) {
        this.errors = []; // Clear error
        // Validate file size and allowed extensions
        if (files.length > 0 && (!this.isValidFiles(files))) {
            this.uploadStatus.emit(false);
            return;
        }
        if (files.length > 0) {
            const formData: FormData = new FormData();
            for (let j = 0; j < files.length; j++) {
                formData.append('file[]', files[j], files[j].name);
            }
            const parameters = {
                projectId: this.projectId,
                sectionId: this.sectionId
            };
            this.fileService.upload(formData, parameters)
                .subscribe(
                success => {
                    this.uploadStatus.emit(true);
                    console.log(success);
                },
                error => {
                    this.uploadStatus.emit(true);
                    this.errors.push(error.ExceptionMessage);
                });
        }
    }

    private isValidFiles(files) {
        // Check Number of files
        if (files.length > this.maxFiles) {
            this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
            return;
        }
        this.isValidFileExtension(files);
        return this.errors.length === 0;
    }

    private isValidFileExtension(files) {
        // Make array of file extensions
        const extensions = (this.fileExt.split(','))
            .map(function (x) { return x.toLocaleUpperCase().trim(); });
        for (let i = 0; i < files.length; i++) {
            // Get file extension
            const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
            // Check the extension exists
            const exists = extensions.includes(ext);
            if (!exists) {
                this.errors.push('Error (Extension): ' + files[i].name);
            }
            // Check file size
            this.isValidFileSize(files[i]);
        }
    }

    private isValidFileSize(file) {
        const fileSizeinMB = file.size / (1024 * 1000);
        const size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
        if (size > this.maxSize) {
            this.errors.push('Error (File Size): ' + file.name + ': exceed file size limit of ' + this.maxSize + 'MB ( ' + size + 'MB )');
        }
    }
}

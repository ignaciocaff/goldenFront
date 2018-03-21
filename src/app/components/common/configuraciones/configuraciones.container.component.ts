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

    items = [
        { name: "Apple", type: "fruit" },
        { name: "Carrot", type: "vegetable" },
        { name: "Orange", type: "fruit" }];
    errorMessage: string;
    images: Array<any> = [];
    arraySubidas: Array<any> = [];
    params: string;

    constructor(private fileService: FileService) { }

    ngOnInit() {

    }


    vegetables = [
        { name: 'Carrot', type: 'vegetable' },
        { name: 'Onion', type: 'vegetable' },
        { name: 'Potato', type: 'vegetable' },
        { name: 'Capsicum', type: 'vegetable' }];

    fruits = [
        { name: 'Apple', type: 'fruit' },
        { name: 'Orange', type: 'fruit' },
        { name: 'Mango', type: 'fruit' },
        { name: 'Banana', type: 'fruit' }];

    droppedFruits = [];
    droppedVegetables = [];
    droppedItems = [];
    fruitDropEnabled = true;
    dragEnabled = true;

    onFruitDrop(e: any) {
        this.droppedFruits.push(e.dragData);
        this.removeItem(e.dragData, this.fruits);
    }

    onVegetableDrop(e: any) {
        this.droppedVegetables.push(e.dragData);
        this.removeItem(e.dragData, this.vegetables);
    }

    onAnyDrop(e: any) {
        this.droppedItems.push(e.dragData);

        if (e.dragData.type === 'vegetable') {
            this.removeItem(e.dragData, this.vegetables);
        } else {
            this.removeItem(e.dragData, this.fruits);
        }
    }

    removeItem(item: any, list: Array<any>) {
        let index = list.map(function (e) {
            return e.name
        }).indexOf(item.name);
        list.splice(index, 1);
    }
}


import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Equipo, Usuario } from '../../../entities/index';

@Component({
  selector: 'usuarios-dialog',
  templateUrl: './usuarios-dialog.component.html',
  styleUrls: ['./usuarios-dialog.component.css']
})
export class UsuariosDialog implements OnInit {

  public usuario = new Usuario();
  public equipo = new Equipo();
  public conjunto = new Array<any>();

  constructor(public dialogRef: MatDialogRef<UsuariosDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.conjunto = data;

  }

  ngOnInit() {
    this.usuario = this.conjunto[0];
    this.equipo = this.conjunto[1];
  }
}
import { Component, Inject, OnInit } from '@angular/core';
import {fabric} from 'fabric';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-label-editor',
  templateUrl: './label-editor.component.html',
  styleUrls: ['./label-editor.component.scss']
})
export class LabelEditorComponent implements OnInit {
  public canvas: any;
  public size: any = {
    width: 80,
    height: 60
  };
  public grid: any = {
    resolution: 20
  };


  constructor() { }

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor: 'blue',
      stateful: true
    });

    this.canvas.setWidth(this.size.width*7.9);
    this.canvas.setHeight(this.size.height*7.9);
  }

}

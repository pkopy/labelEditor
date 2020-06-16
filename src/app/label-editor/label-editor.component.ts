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
    width: 120,
    height: 80
  };
  public grid: any = {
    resolution: 20
  };
  public url: string = '';


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

  //Size of canvas

  changeSize() {
    this.canvas.setWidth(this.size.width*8.2);
    this.canvas.setHeight(this.size.height*8.2);
  }

  //Block "Add figure"

  addFigure(figure) {
    let add: any;
    switch (figure) {
      case 'rectangle':
        add = new fabric.Rect({
          width: 200, height: 100, left: 10, top: 10, angle: 0,
          fill: 'transparent', stroke: '#000'
        });
        break;
      case 'square':
        add = new fabric.Rect({
          width: 100, height: 100, left: 10, top: 10, angle: 0,
          fill: '#4caf50'
        });
        break;
      case 'triangle':
        add = new fabric.Triangle({
          width: 100, height: 100, left: 10, top: 10, fill: '#2196f3'
        });
        break;
      case 'circle':
        add = new fabric.Circle({
          radius: 50, left: 10, top: 10, fill: 'transparent', stroke: '#000',
        });
        break;
    }
    // this.extend(add, this.randomId());
    this.canvas.add(add);
    // this.selectItemAfterAdded(add);
  }

  //Add image

  addImageOnCanvas(url) {
    if (url) {

      fabric.Image.fromURL(url, (image) => {
        let img: any = image.getElement();
        if (img && img.naturalWidth !== 0 && img.naturalHeight !== 0) {
          console.log(image, 'image')
          image.set({
            left: 10,
            top: 10,
            angle: 0,
            padding: 10,
            cornerSize: 10,
            // selectionBackgroundColor: '#000',
            hasRotatingPoint: true,
            centeredRotation: true,
            absolutePositioned:true,
            // rotatingPointOffset: 1,
            width: img.naturalWidth,
            height: img.naturalHeight,
            scaleX: img.naturalWidth > (this.canvas.getWidth()*0.5)?(this.canvas.getWidth()*0.5)/img.naturalWidth:1,
            scaleY: img.naturalWidth > (this.canvas.getWidth()*0.5)?(this.canvas.getWidth()*0.5)/img.naturalWidth:1,
            // scaleX:1,
            // scaleY:1,
            stroke: '#000000'
            // filters: [new f.BlackWhite()]
            // filters: [new f.GrayScale()]
          });
          const filter = new fabric.Image.filters.BlendColor({
            color: '#000',
            mode: 'multiply'
          });
          // var filter1 = new fabric.Image.filters.Brightness({
          //   brightness: 0
          // });
          image.filters.push(filter);
          // image.filters.push(filter1);
          image.applyFilters();
        }


        // this.extend(image, this.randomId());

        image.applyFilters();
        this.canvas.add(image);
        // this.selectItemAfterAdded(image);
      });
    }
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event) => {
        this.url = event.target['result'];
        this.addImageOnCanvas(event.target['result'])
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  //Clear the canvas
  confirmClear() {
    if (confirm('Are you sure?')) {
      this.canvas.clear();
    }
  }

}

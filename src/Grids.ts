import "./css/grid.css"
import interact from 'interactjs'
import { InteractEvent } from "@interactjs/types";
import Cell, { Direction } from './cell';
import { Tile } from './Tile';
import { _UI } from "./Ui";
import { _Campaign } from "./Campaign";

export class Isometric
{
  rows: number;
  cols: number;
  cells: Cell[];
  el: HTMLElement;
  dragEl: HTMLElement;
  cellSize : Number;
  transformStyle: string;
  transformEl: HTMLElement;
  constructor(rows:number, cols: number, tileDatas: Tile[]){
      this.rows = rows;
      this.cols = cols;
      this.cells = new Array(rows * cols);
      this.dragEl = null;
      this.cellSize = 76;
      this.el = this.render(tileDatas);
      this.cells.forEach(c => c.neighbors = this.getNeighborCells(c));
  }

  render(tileDatas: Tile[]){
      let grid = document.createElement("div");
      grid.classList.add("grid");
      let i = 0;
      outer: for(let x = 0; x < this.rows; x++){
          let row = document.createElement("div");
          row.style.marginLeft = `${-this.cellSize* x}px`;
          row.classList.add("row");
          for(let y = 0; y < this.cols; y++){
              if(i >= this.cells.length){ break outer; }
              this.cells[i] = new Cell(i,x,y,this.cols,row,tileDatas[i],this.rows*this.cols);
              i++;
          }
          grid.prepend(row);
      }

      return grid;
  }

  sizeGrid(grid : any){
      const parent = grid.parentElement;
      parent.style.paddingLeft = `${+this.cellSize * (this.cols - 1)}px`;
      parent.style.paddingRight = `${this.cellSize}px`;
      parent.style.paddingBottom = `${this.cellSize}px`;
      grid.style.marginTop = `${-this.cellSize}px`;
  }

  angleScale = {
    scale: 1,
    currentScale: 1
  }

  makeDraggable(querySelector : any){
    this.dragEl = document.querySelector(querySelector);
    this.dragEl.style.pointerEvents = 'all';
    this.dragEl.style.touchAction = 'auto';
    const rect = this.dragEl.getBoundingClientRect();

    interact("#map").gesturable({
      listeners: {
        move (event) {
          _Campaign.grid.angleScale.currentScale = event.scale * _Campaign.grid.angleScale.scale;
          _Campaign.grid.dragMoveListener(event);
        },
        end (event) {
          _Campaign.grid.angleScale.scale = _Campaign.grid.angleScale.scale * event.scale;
        }
      }
    }).draggable({
      listeners: { 
        move : _Campaign.grid.dragMoveListener
      }
    });
    
    interact(querySelector).on('tap', function (event) {
      const cell = _UI.getCellAtMouse();
      if(cell !== undefined){_UI.render(cell.tile);}
      
      event.preventDefault();
    })
  }

  dragMoveListener (event : any) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  
    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)' + ' scale(' + _Campaign.grid.angleScale.currentScale + ')';
  
    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  setValidityForAllCells(allValid:boolean|null, tile : Tile|null):boolean{
    let anyValid = false;
    this.cells.forEach(cell => {

      const cellValid = (allValid === null 
        && tile.canPlace(cell.tile.type)
        && cell.hasMetNeighborRequirements(tile));
        if(cellValid){anyValid = true;}

      const status = allValid === null ? cellValid : allValid;
      cell.el.classList.toggle("valid",status);
      cell.el.classList.toggle("invalid",!status);
    });

    return anyValid;
  }

  getNeighborCells(cell:Cell):Map<Direction,Cell>{
    var dirs = [Direction.left,Direction.up,Direction.right,Direction.down];
    let neighbors = new Map<Direction,Cell>;
    for (let i = 0; i < dirs.length; i++) {
        const offset = Cell.DirectionOffset(dirs[i]);
        if(this.canGetNeightborCell(cell, offset[0], offset[1])){
          neighbors.set(dirs[i], this.getNeightborCell(cell,  offset[0], offset[1]));
        }
    }
    return neighbors;
  }

  canGetNeightborCell(cell:Cell ,offX:number, offY:number){
    if(cell.y + offY >= this.cols){return false;}
    if(cell.y + offY < 0){return false;}
    if(cell.x + offX >= this.rows){return false;}
    if(cell.x + offX < 0){return false;}
    return true;
  }

  getNeightborCell(cell:Cell ,offX:number, offY:number){
    let nX = cell.x + offX;
    let nY = cell.y + offY;
    return this.cells[(nX * this.rows) + nY];
  }
}

export default Isometric;
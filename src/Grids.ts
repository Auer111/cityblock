import "./css/grid.css"
import interact from 'interactjs'
import { InteractEvent } from "@interactjs/types";
import Cell from './cell';
import { Tile } from './Tile';

export class Isometric
{
  rows: number;
  cols: number;
  cells: Cell[];
  el: HTMLElement;
  dragEl: HTMLElement;
  cellSize : Number;
  constructor(rows:number, cols: number, tileDatas: Tile[]){
      this.rows = rows;
      this.cols = cols;
      this.cells = new Array(rows * cols);
      this.dragEl = null;
      this.cellSize = 76;
      this.el = this.render(tileDatas);
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
              this.cells[i] = new Cell(i,x,y,this.cols,row,tileDatas[i]);
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

  makeDraggable(querySelector : any){
    this.dragEl = document.querySelector(querySelector);
    this.dragEl.style.pointerEvents = 'all';
    this.dragEl.style.touchAction = 'auto';
    const rect = this.dragEl.getBoundingClientRect();

    interact(querySelector).draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: {
              top: -rect.height / 2, 
              right: document.scrollingElement.clientWidth + (rect.width / 2), 
              bottom: document.scrollingElement.clientHeight + (rect.height / 2), 
              left: -rect.width / 2
            }
          })
        ],
        listeners: {
          move (event : InteractEvent) {
            var target = event.target
            // keep the dragged position in the data-x/data-y attributes
            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
            
            // translate the element
            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
            
            // update the posiion attributes
            target.setAttribute('data-x', String(x))
            target.setAttribute('data-y', String(y))
          }
        }
    });
  }

  SetGridValidity(isValid:boolean, tile : Tile | null){
    this.cells.forEach(cell => {
      const valid = this.isValidAnyNeighborCells(cell, tile);
      cell.el.classList.toggle("valid",valid);
      cell.el.classList.toggle("invalid",!valid);
    });
  }

  tryUpgradeNeighborCells(cell:Cell)
  {
    var dirs = [[0,1],[-1,0],[0,-1],[1,0]];
    for (let i = 0; i < dirs.length; i++) {
        if(this.canGetNeightborCell(cell, dirs[i][0], dirs[i][1])){
          this.getNeightborCell(cell, dirs[i][0], dirs[i][1]).tryUpgrade();
        }
    }
  }

  isValidAnyNeighborCells(cell:Cell,tile:Tile)
  {
    if(!tile){return true;}

    let lookingFor = [...tile.requiredNeighbors];
    var dirs = [[0,1],[-1,0],[0,-1],[1,0]];
    for (let i = 0; i < dirs.length; i++) {
        if(!this.canGetNeightborCell(cell, dirs[i][0], dirs[i][1])){
            continue;
        }
        let neighborId = this.getNeightborCell(cell, dirs[i][0], dirs[i][1]).tile.id;
        let remove = lookingFor.findIndex(id => id == neighborId);
        if(remove != -1){
            lookingFor.splice(remove,1);
        }
    }
    return lookingFor.length === 0;
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
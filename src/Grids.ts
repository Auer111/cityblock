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

                this.cells[i] = new Cell(i,x,y,row,tileDatas[i]);

                if(x === this.cols - 1 && y === 0){
                    this.cells[i].el.classList.add("grid-left");
                }
                row.appendChild(this.cells[i].el);

                i++;
            }
            grid.prepend(row);
        }

        return grid;
    }

    updateAdjacent(){

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
            //cell.isValidAllNeighborCells(tile);
        });
    }
}

export default Isometric;
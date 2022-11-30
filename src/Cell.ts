import { Tile } from "./Tile";

export class Cell
{
    id:number;
    x : number;
    y : number;
    tile: Tile;
    el : HTMLElement;
    parent : HTMLElement;
    constructor(id:number,x:number,y:number, parent:HTMLElement, tile: Tile){
        this.id=id;
        this.x = x;
        this.y = y;
        this.tile = tile;
        this.parent = parent;
        this.el = this.render();
        this.parent.appendChild(this.el);
    }

    render() : HTMLElement 
    {
        let cell = document.createElement("div");
        cell.classList.add('cell');
        cell.classList.add(`cell-${this.x}-${this.y}`);
        cell.style.zIndex = String(1000 - this.x - this.y);
        cell.insertAdjacentHTML('beforeend',`
        <div class="overlay">
            <div>
                <div id="${cell.id}" class="dropzone"></div>
            </div>
        </div>`);
        cell.appendChild(this.tile.img);
        return cell;
    }

    // isValidAllNeighborCells(tile){
    //     var dirs = [[0,0,0],[1,0,1],[2,-1,0],[3,0,-1],[4,1,0]];
    //     for (let i = 0; i < dirs.length; i++) {
    //         if(!this.isAdjacentTileValid(cell,tile,dirs[i][0],dirs[i][1],dirs[i][2])){
    //             return false;
    //         }
    //     }
    //     return this.isValidAnyNeighborCells(cell, tile);
    // }

    // isAdjacentTileValid(cell, tile, validAll, x, y){
    //     const required = tile.validAll[validAll];
    //     const neighbor = this.canGetNeightborCell(cell, x, y);
    //     const outOfBounds = required != -1 && !neighbor;
    //     const invaidSquare = required != -1 && neighbor && required != this.getNeightborCellTileId(cell, x, y);
    //     if(outOfBounds || invaidSquare){
    //         return false;
    //     }
    //     return true;
    // }

    // isValidAnyNeighborCells(cell,tile){
        
    //     let lookingFor = [...tile.validAny];

    //     var dirs = [[0,1],[-1,0],[0,-1],[1,0]];
    //     for (let i = 0; i < dirs.length; i++) {
    //         if(!this.canGetNeightborCell(cell, dirs[i][0], dirs[i][1])){
    //             continue;
    //         }
    //         let neighborId = this.getNeightborCellTileId(cell, dirs[i][0], dirs[i][1]);
    //         let remove = lookingFor.findIndex(id => id == neighborId);
    //         if(remove != -1){
    //             lookingFor.splice(remove,1);
    //         }
    //     }
    //     return lookingFor.length === 0;
    // }

    // canGetNeightborCell(cell ,offX, offY){
    //     if(cell.y + offY >= this.cols){return false;}
    //     if(cell.y + offY < 0){return false;}
    //     if(cell.x + offX >= this.rows){return false;}
    //     if(cell.x + offX < 0){return false;}
    //     return true;
    // }

    // getNeightborCellTileId(cell ,offX, offY){
    //     let nX = cell.x + offX;
    //     let nY = cell.y + offY;
    //     return this.cells[(nX * this.rows) + nY].tileId;
    // }

}
export default Cell;
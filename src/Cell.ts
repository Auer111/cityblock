import { _Campaign } from "./Campaign";
import { _Data } from "./Data";
import { Deck } from "./Deck";
import { Tile } from "./Tile";
import { _UI } from "./Ui";

export class Cell
{
    id:number;
    x : number;
    y : number;
    gridColumnCount : number;
    tile: Tile;
    el : HTMLElement;
    parent : HTMLElement;
    constructor(id:number,x:number,y:number, gridColumnCount:number, parent:HTMLElement, tile: Tile){
        this.id=id;
        this.x = x;
        this.y = y;
        this.gridColumnCount = gridColumnCount;
        this.tile = tile;
        this.parent = parent;
        this.el = this.render();
        this.parent.appendChild(this.el);
    }

    //Update tile and rerender
    _setTile = function(tile:Tile) : void{
        this.tile = tile;
        this.el.innerHTML = this.render().innerHTML;
    }

    //update tile and all neighbors
    public placeTile = function(tile:Tile) : void
    {
        this._setTile(tile);
        this.tryUpgrade();
        _Campaign.grid.tryUpgradeNeighborCells(this);
    }
    
    tryUpgrade(){
        let upgraded:boolean = false;
        this.tile.upgradeIds.forEach(upId => {
            const tile:Tile = Tile.one(upId);
            if(tile !== undefined && _Campaign.grid.isValidAnyNeighborCells(this,tile) === true){
                this.placeTile(tile);
                return;
            }
        });
    }

    render() : HTMLElement 
    {
        if(this.tile === undefined){
            debugger;
        }
        let cell = document.createElement("div");
        cell.classList.add('cell');
        cell.classList.add(`cell-${this.x}-${this.y}`);
        if(this.x === this.gridColumnCount - 1 && this.y === 0){
            cell.classList.add("grid-left");
        }

        cell.style.zIndex = String(1000 - this.x - this.y);
        cell.insertAdjacentHTML('beforeend',`
        <div class="overlay">
            <div>
                <div id="${cell.id}" class="dropzone"></div>
            </div>
        </div>
        ${this.tile.wrappedImg().outerHTML}`);

        return cell;
    }
}
export default Cell;
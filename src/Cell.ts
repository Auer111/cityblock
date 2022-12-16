import { _Campaign } from "./Campaign";
import { _Data } from "./Data";
import { Tile, TileType } from "./Tile";
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
    needsResourceRefresh : boolean;
    public neighbors : Cell[] = [];
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

    //update tile and all neighbors
    public placeTile = function(type:TileType) : void
    {
        this._setTile(type);
        this.tryUpgrade();
        this.neighbors.forEach((n:Cell) => n.tryUpgrade());
    }

    //Update tile and rerender
    _setTile = function(type:TileType) : void{
        this.tile = Tile.one(type);
        this.el.innerHTML = this.render().innerHTML;
        _Campaign.level.resources.push(...this.tile.produces);
    }
    
    tryUpgrade(){
        this.needsResourceRefresh = true;
        this.tile.autoUpgrades.forEach(upId => {
            const tile:Tile = Tile.one(upId);
            if(tile !== undefined && this.hasMetNeighborRequirements(tile) === true){
                this.placeTile(tile.type);
                return;
            }
        });
    }

    hasMetNeighborRequirements(tile:Tile)
    {
        if(!tile){return true;}
        let lookingFor = [...tile.requiredNeighbors];
        this.neighbors.forEach(neighbor => {
            let neighborType = neighbor.tile.type;
            let remove = lookingFor.findIndex(i => i == neighborType);
            if(remove != -1){
                lookingFor.splice(remove,1);
            }
        });

        return lookingFor.length === 0;
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
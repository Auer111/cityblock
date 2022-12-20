import { _Campaign } from "./Campaign";
import { _Data } from "./Data";
import { Tile, TileType } from "./Tile";
import { _UI } from "./Ui";

export enum Direction{
    left,
    up,
    right,
    down
}

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
    public neighbors : Map<Direction,Cell> = new Map();
    constructor(id:number,x:number,y:number, gridColumnCount:number, parent:HTMLElement, tile: Tile, gridTotalCells:number){
        this.id=id;
        this.x = x;
        this.y = y;
        this.gridColumnCount = gridColumnCount;
        this.tile = tile;
        this.parent = parent;
        this.el = this.render(gridTotalCells);
        this.parent.appendChild(this.el);
    }

    public static DirectionOffset(dir: Direction){
        switch (dir){
            case Direction.left: return [1,0];
            case Direction.up: return [0,1];
            case Direction.right: return [-1,0];
            case Direction.down: return [0,-1];
        }
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
        this._setBaseRoads(true);
        _Campaign.level.addResources([...this.tile.produces]);
        _Campaign.level.addTile(type);
        
        this.tile.placedAmount++;
    }

    _setBaseRoads(updateNeighbors:boolean){
        
        const left = this.neighbors.get(Direction.left)?.tile.roadAccess ?? false;
        const up = this.neighbors.get(Direction.up)?.tile.roadAccess ?? false;
        const right = this.neighbors.get(Direction.right)?.tile.roadAccess ?? false;
        const down = this.neighbors.get(Direction.down)?.tile.roadAccess ?? false;

        let baseType = this.tile.base;
        if(this.tile.roadRender){
            if(left && up && right && down){baseType = TileType.Grass_path_all;}
            else if(left && right){ baseType = TileType.Grass_path_leftright;}
            else if(up && down){baseType = TileType.Grass_path_updown;}
            else if(up && left){baseType = TileType.Grass_path_upleft;}
            else if(up && right){baseType = TileType.Grass_path_upright;}
            else if(down && left){baseType = TileType.Grass_path_leftdown;}
            else if(down && right){baseType = TileType.Grass_path_rightdown;}
            else if(left){baseType = TileType.Grass_path_left;}
            else if(up){baseType = TileType.Grass_path_up;}
            else if(right){baseType = TileType.Grass_path_right;}
            else if(down){baseType = TileType.Grass_path_down;}
    
            const imgBase = this.el.querySelector('.base') as HTMLImageElement;
            if(imgBase){
                imgBase.src = `./img/tiles/${TileType[baseType]+'.png'}`;
            }
        }
        
        if(updateNeighbors){
            if(left){this.neighbors.get(Direction.left)._setBaseRoads(false);}
            if(right){this.neighbors.get(Direction.right)._setBaseRoads(false);}
            if(up){this.neighbors.get(Direction.up)._setBaseRoads(false);}
            if(down){this.neighbors.get(Direction.down)._setBaseRoads(false);}
        }
        
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
        let requiredValid = false;
        let lookingFor = [...tile.requiredNeighbors];
        this.neighbors.forEach(neighbor => {
            let neighborType = neighbor.tile.type;
            let remove = lookingFor.findIndex(i => i == neighborType);
            if(remove != -1){
                lookingFor.splice(remove,1);
            }
        });
        requiredValid = lookingFor.length === 0;

        let anyValid = false;
        if(tile.requiredNeighborsAny.length !== 0){
            tile.requiredNeighborsAny.forEach(lookingFor => {
                if([...this.neighbors.values()].find(neighbor => neighbor.tile.type == lookingFor) !== undefined){
                    anyValid = true;
                }
            });
        }
        else{
            anyValid = true;
        }
        
        return requiredValid && anyValid;
    }

    render(cellCount: number) : HTMLElement 
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
        cell.style.zIndex = String(Math.pow(cellCount,2) - this.x - this.y);
        
        cell.insertAdjacentHTML('beforeend',`
        <div class="overlay">
            <div>
                <div id="${cell.id}" class="dropzone"></div>
            </div>
        </div>
        ${this.tile.wrappedImg().outerHTML}`);

        const base = cell.querySelector(".base") as HTMLImageElement;

        return cell;
    }
}
export default Cell;
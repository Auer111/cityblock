import Quest from "./Quest";
import { _UI } from "./Ui";
import { _Data } from "./Data";
import Isometric from "./Grids";
import { Level } from "./Level";
import { Tile } from "./Tile";

export class Campaign
{
    level : Level = null;
    grid : Isometric;
    gridWrapperEl : HTMLElement;
    Quest: Quest;
    constructor(){
        
    }

    init(){
        this.loadLevel(0);
    }
    loadNextLevel(){
        this.loadLevel(this.level.id + 1);
    }
    loadLevel(index: number){
        this.level = _Data.levels[index];
        _UI.onLevelStart();

        const items = (new Array(this.level.size ** 2).fill(_Data.tiles[0])) as Tile[];
        this.grid = new Isometric(this.level.size,this.level.size, items);

        this.level.cells.forEach(T2C=> {
            const gridCell = this.grid.cells.find(c => c.x == T2C.X && c.y == T2C.Y);
            if(gridCell !== undefined){
                gridCell.setTile(T2C.Tile);
            }
        });

        this.gridWrapperEl = document.getElementById("map").children[0] as HTMLElement;
        this.gridWrapperEl.innerHTML = "";
        this.gridWrapperEl.appendChild(this.grid.el);
        this.grid.sizeGrid(this.grid.el);
        this.grid.makeDraggable(".bg");
    }
}

export const _Campaign = new Campaign();
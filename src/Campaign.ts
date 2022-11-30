import Quest from "./Quest";
import UI from "./Ui";
import { _Data } from "./Data";
import Isometric from "./Grid";
import { Level } from "./Level";

export class Campaign
{
    level : Level = _Data.levels[0];
    grid : Isometric;
    gridWrapperEl : HTMLElement;
    Quest: Quest;
    UI:UI;
    constructor(){
        this.gridWrapperEl = document.getElementById("map").children[0] as HTMLElement;
    }

    init(){
        this.loadLevel(0);
    }
    loadNextLevel(){
        this.loadLevel(this.level.id + 1);
    }
    loadLevel(index: number){
        this.level = _Data.levels[index];

        this.Quest = new Quest();
        this.UI = new UI();

        this.grid = new Isometric(this.level.size,this.level.size, 
            new Array(this.level.size).fill(_Data.tiles[0]));

        this.gridWrapperEl.innerHTML = "";
        this.gridWrapperEl.appendChild(this.grid.el);
        this.grid.sizeGrid(this.grid.el);
        this.grid.makeDraggable(".bg");
    }


}

export const _Campaign = new Campaign();
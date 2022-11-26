import Isometric from "./grid/grid.js";
import Quest from "./ui/quest.js";
import UI from "./ui/ui.js";
import Player from "./player.js";

export class Campaign
{
    constructor(){
        window.CAMPAIGN = this;
        this.data = null;
        this.gridContainer = null
        this.level = null;
    }

    init(){
        this.data = window.DATA.data;
        this.gridContainer = document.getElementById("map").children[0];
        this.loadLevel(this.data.currentLevel);
    }

    loadLevel(index){
        this.level = this.data.levels.find(l => l.id === index);

        new Player(this.data);
        new Quest(this.data);
        new UI(this.data);

        const startTile = this.data.tiles[0];
        var items = new Array(this.level.tiles.length).fill()
        .map((item,index) => ({ 
            gridId: index, 
            tileId: startTile.id, 
            img: window.IMG.render(startTile.img)
        }));

        const rowColCount = Math.sqrt(this.level.tiles.length);

        window.GRID = new Isometric(rowColCount,rowColCount, items);
        const gridEl = window.GRID.render();
        this.gridContainer.innerHTML = "";
        this.gridContainer.appendChild(gridEl);
        window.GRID.sizeGrid(gridEl);
        window.GRID.makeDraggable(".bg");
    }
}

export default new Campaign();
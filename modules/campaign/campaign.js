import Isometric from "../grid/grid.js";
import Quest from "../ui/quest.js";
import UI from "../ui/ui.js";
import Player from "../player.js";
import Utils from "../Utils.js";

export class Campaign
{
    constructor(){
        new Utils().loadCss(import.meta.url);
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
        this.data.currentLevel = index;
        this.level = this.data.levels.find(l => l.id === index);

        new Player(this.data);
        new Quest(this.data);
        new UI(this.data);

        let items = [];
        let i = 0;
        this.data.levels[this.data.currentLevel].tiles.forEach(id=> {
            let tile = this.data.tiles.find(x => x.id == id);
            items.push({ 
                gridId: i, 
                tileId: id, 
                img: window.IMG.render(tile.img)
            });
            window.QUEST.placed(id);
            i++;
        });

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
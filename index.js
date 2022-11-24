import Img from "./modules/img/img.js";
import Isometric from "./modules/grid/grid.js";
import UI from "./modules/ui/ui.js";
import Utils from "./modules/Utils.js";
import { Player } from "./modules/player.js";
import { Quest } from "./modules/ui/quest.js";

new Utils();
new Img();
//utils.loadHtml("./modules/nav/nav.html", (html) => {console.log(html);});

window.UTILS.getJson("data.json", (data) => {
    data.tiles.forEach(tData => {
        tData.validAny = tData.validAny.filter(t => t > 0);
        tData.unlocked = tData.require == null;
    });
    Init(data);
});

function Init(data){
    //console.log(data);
    window.data = data;
    new Player(data);
    new Quest(data);
    new UI(data);
    

    const startTile = data.tiles[0];
    var items = new Array(9).fill()
    .map((item,index) => ({ 
        gridId: index, 
        tileId: startTile.id, 
        img: window.IMG.render(startTile.img)
    }));

    window.GRID = new Isometric(3,3, items);
    const gridEl = window.GRID.render();
    document.getElementById("map").children[0].appendChild(gridEl);
    window.GRID.sizeGrid(gridEl);
    window.GRID.makeDraggable(".bg");

}

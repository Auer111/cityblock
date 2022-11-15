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
    });
    Init(data);
});

function Init(data){
    window.data = data;
    new Player(data);
    new UI(data);
    new Quest(data);

    const startTile = data.tiles[0];
    var items = new Array(25).fill()
    .map((item,index) => ({ 
        gridId: index, 
        tileId: startTile.id, 
        img: window.IMG.render(startTile.img)
    }));

    window.GRID = new Isometric(5,5, items);
    document.getElementById("hero").children[0].appendChild(window.GRID.render());
}

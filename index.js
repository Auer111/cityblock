import Img from "./modules/img/img.js";
import Isometric from "./modules/grid/grid.js";
import UI from "./modules/ui/ui.js";
import Utils from "./modules/Utils.js";

new Utils();
new Img();
//utils.loadHtml("./modules/nav/nav.html", (html) => {console.log(html);});

window.UTILS.getJson("data.json", (data) => {
    Init(data);
});

function Init(data){
    window.data = data;
    new UI(data);

    const startTile = data.tiles[0];
    var items = new Array(25).fill()
    .map((item,index) => ({ 
        gridId: index, 
        tileId: startTile.id, 
        img: window.IMG.render(startTile.img), 
        click: ()=>{window.UI.ClickCell(index)},
        drag: ()=>{window.UI.ClickCell(index)}
    }));

    new Isometric(5,5, items);

}

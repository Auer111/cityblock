import Img from "/modules/img/img.js";
import Isometric from "/modules/grid/grid.js";
import Utils from "./modules/Utils.js";

const utils = new Utils();
utils.loadHtml("/modules/nav/nav.html", (html) => {console.log(html);});

const img = new Img();
const grid = new Isometric(5,5,
    [
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Pumpjack, 'pumpjack-animation'), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
        { img: img.render(img.Wheat), click: ()=>{}},
    ]);
document.getElementById("hero").children[0].appendChild(grid.render());

import Img from "/modules/img/img.js";
import Isometric from "/modules/grid/grid.js";
import Utils from "./modules/Utils.js";

const utils = new Utils();
utils.loadHtml("/modules/nav/nav.html", (html) => {console.log(html);});

const img = new Img();
const grid = new Isometric(5,5,
    [
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(img.Calendar), click: ()=>{ window.location.href = "/modules/calendar/"; }},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
        { img: img.render(), click: ()=>{}},
    ]);
document.getElementById("hero").children[0].appendChild(grid.render());

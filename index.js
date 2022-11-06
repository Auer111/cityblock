import Img from "/modules/img/img.js";
import Isometric from "/modules/grid/grid.js";
import Utils from "./modules/Utils.js";

const utils = new Utils();
const img = new Img();
//utils.loadHtml("/modules/nav/nav.html", (html) => {console.log(html);});

utils.getJson("data.json", (data) => {
    Init(data);
});

function Init(data){
    window.data = data;

    const startTile = data.tiles[0];

    var items = new Array(25).fill()
    .map((item,index) => ({ gridId:index, tileId: startTile.id, img: img.render(startTile.img), click: ()=>{ClickGridTile(index)}}));

    const grid = new Isometric(5,5, items);

    document.getElementById("hero").children[0].appendChild(grid.render());
    window.grid = grid;

    const catsWrapperEl = document.getElementById("cats");
    data.cats.forEach(cat => {
        if(!cat.name){return;}

        console.log("data cat:"+cat.name);
        var el = document.createElement('div');
        el.innerHTML = `
        <button class="button-19 ${cat.color}" role="button" onClick='window.SelectCat(${cat.id})'>
            <i class="fa-solid fa-${cat.icon} fa-fw"></i>
        </button>`;
        catsWrapperEl.appendChild(el);
    });
}

window.SelectCat = function SelectCat(id){
    var container = window.document.getElementById("current-cat");
    container.innerHTML = "";
    data.tiles.forEach(t => {
        if(t.category == id){
            let el = document.createElement('div');
            el.innerHTML = `
            <button onClick="SelectTile(this,${t.id})">
                <img src='/modules/img/${t.img}'/>
            </button>`;
            container.prepend(el);
        }
    });
}

window.SelectTile = function SelectTile(that,id){
    window.document.querySelectorAll('button.selected').forEach(i => i.classList.remove('selected'));
    that.classList.add('selected');

    const tile = data.tiles.find(x => x.id == id);
    grid.items.forEach(t => {
        if(true){
            t.el.classList.add("can-place");
            t.el.classList.remove("cant-place");
        }
        else{
            t.el.classList.add("cant-place");
            t.el.classList.remove("can-place");
        }
    });

    window.SelectedTile = tile;
}

window.ClickGridTile = function ClickGridTile(id){  
    if(!window.grid || window.SelectedTile == null){return;}
    
    const item = window.grid.items.find(x => x.gridId == id);
    console.log(item.el);
    if(item.el.classList.contains("can-place")){
        item.tileId = SelectedTile.id;
        item.img = img.render(SelectedTile.img, SelectedTile.name);
        item.el.querySelector(".img-wrapper").replaceWith(item.img);
    }
}


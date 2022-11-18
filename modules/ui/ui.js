import Utils from "../Utils.js"
import Isometric from "../grid/grid.js";

export class UI{
    constructor(data){
        new Utils().loadCss(import.meta.url);
        window.UI = this;

        
        this.placementOverlay = document.body.querySelector("#can-place-overlay");
        this.placementCellId = null;
        this.mousePos = [0,0];
        this.init(data);
    }

    init(){
        
        this.renderHand();
        interact('.card.drag').draggable({
            listeners: {
              start (event) {window.UI.dragstart(event.target);},
              move (event) {window.UI.drag(event.target)},
              end (event){window.UI.dragend(event.target);}
            }
        });
        document.addEventListener("mousemove",(event)=>{
            window.UI.mousePos = [event.clientX,event.clientY];
        });
        document.addEventListener("touchmove",(event)=>{
            window.UI.mousePos = [event.touches[0].clientX,event.touches[0].clientY];
        });
    }

    renderHand(){
        window.document.getElementById("cards").innerHTML = window.PLAYER.hand
        .map((tile) => this.getCardHtml(tile))
        .join('');
    }

    dragstart(card){
        window.GRID.SetGridValidity(null,window.data.tiles.find(x => x.id == card.id));
        card.hidden = true;
        document.querySelectorAll('.cell').forEach(el => el.classList.remove('hover'));
    }
    drag(card){
        const cell = this.getCellAtMouse();
        document.querySelectorAll('.cell').forEach(el => el.classList.remove('hover'));
        if(!cell){return;}
        cell.el.classList.add('hover');
        this.setCanPlaceOverlay(cell, card.id);
    }
    dragend(card){
        const cell = this.getCellAtMouse();
        this.setCanPlaceOverlay();
        card.hidden = false;
        if(this.placeTile(cell, card.id)){
            window.PLAYER.removeCard(card.id);
            cell.el.classList.remove('hover');
        }
        window.GRID.SetGridValidity(true);
    }
    
    placeTile(cell, tileId){
        if(!window.GRID || !cell || !tileId){return false;}

        let selectedTile = data.tiles.find(x => x.id == tileId);
        if(cell.el.classList.contains("valid")){
            cell.tileId = selectedTile.id;
            cell.img = window.IMG.render(selectedTile.img, selectedTile.name);
            cell.el.querySelector(".img-wrapper").replaceWith(cell.img);
            window.QUEST.placed(tileId);
            return true;
        }
        return false;
    }

    getCardHtml(tile){
        if(!tile){return;}

        const cat = window.data.cats.find(x => x.id == tile.catId);
        const img = window.IMG.raw(tile.img);

        var items = new Array(9).fill()
        .map((item,index) => this.getCardCell(tile, index));

        items[4].img = window.IMG.render(window.data.tiles[0].img);
        

        const grid = new Isometric(3,3, items);
        return `
        <figure id="${tile.id}" class="card drag card--${cat.color}">
            ${img}
            <div class="triangle"></div>
            <figcaption class="card__caption">
                <div class="card__image-container">
                    <h3 class="card__type">${cat.name}</h3>
                </div>
                <h1 class="card__name">${tile.name}</h1>
                <div class="grid-wrapper">
                    ${grid.render().outerHTML}
                </div>
            </figcaption>
        </figure>`;
    }

    getCardCell(tile, index){
        let tId = null;
        let selectedTile = null;
        switch(index){
            case 0: tId = null; break;
            case 1: tId = tile.validAll[2]; break;
            case 2: tId = null; break;
            case 3: tId = tile.validAll[3]; break;
            case 4: tId = tile.validAll[0]; break;
            case 5: tId = tile.validAll[1]; break;
            case 6: tId = null; break;
            case 7: tId = tile.validAll[4]; break;
            case 8: tId = null; break;
        }
        if(tId && tId != -1){selectedTile = data.tiles.find(x => x.id == tId);}
        return { 
            gridId: index, 
            tileId: tId, 
            img: window.IMG.render(selectedTile?.img),
            overlay: index == 4 ? `<i class="fa-solid fa-down-long"></i>` : null
        };
    }

    setCanPlaceOverlay(cell, tileId){ 
        if(!window.GRID || !cell || !tileId){
            this.placementOverlay.style.display = 'none';
            return;
        }
        //did not change cell
        if(cell.gridId === this.placementCellId){
            return;
        }
        let selectedTile = data.tiles.find(x => x.id == tileId);
        this.placementOverlay.style.display = 'grid';
        this.placementOverlay.querySelector("img").src = window.IMG.url(selectedTile.img);
        cell.el.appendChild(this.placementOverlay);
        this.placementCellId = cell.gridId;
    }

    getCellAtMouse(){
        var cellXY = this.screen2Iso(this.mousePos);
        return window.GRID.items.find(cell => cell.x == cellXY[0] && cell.y == cellXY[1]);
    }

    screen2Iso(screen) {
        var theta = 30.5;
        var c = Math.cos(theta/2);
        var s = Math.sin(theta/2);
        var rect = document.getElementById("20").getBoundingClientRect();
        var origin = [rect.left + (rect.width/2), rect.top + (rect.height/2)]; //the pixel coordinates of (0, 0)
        var unit = rect.width + 10; //+padding
        var isoX = ((screen[0] - origin[0]) / c - (screen[1] - origin[1]) / s) / unit;
        var isoY = ((screen[0] - origin[0]) / c + (screen[1] - origin[1]) / s) / unit;
        var cell = [window.GRID.rows - 1 - Math.round(isoX) * -1, Math.round(isoY) * -1];
        return  cell;
    }
}

export default UI;
import Utils from "../Utils.js"

export class UI{
    constructor(data){
        new Utils().loadCss(import.meta.url);
        window.UI = this;
        this.mousePos = [0,0];
        this.init(data);
    }

    init(data){
        
        this.renderHand();
        interact('.card').draggable({
            listeners: {
              start (event) {window.UI.dragstart(event);},
              move (event) {window.UI.drag()},
              end (event){window.UI.dragend(event);}
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
        .map((tile) => this.renderCard(tile))
        .join('');
    }

    dragstart(event){
        var target = event.target;
        window.UI.GrabCard(target.id);              
        target.hidden = true;
        document.querySelectorAll('.cell').forEach(el => el.classList.remove('hover'));
    }
    drag(){
        const cell = this.getCellAtMouse();
        
        document.querySelectorAll('.cell').forEach(el => el.classList.remove('hover'));
        if(!cell){return;}
        cell.el.classList.add('hover');
        //window.GRID.SetCanPlaceOverlay(event.target.id, event.relatedTarget.id);
    }
    dragend(event){
        const cell = this.getCellAtMouse();
        window.GRID.SetCanPlaceOverlay();

        var target = event.target;
        target.hidden = false;
        if(cell){
            event.target.remove();
            cell.el.classList.remove('hover');
            
            window.GRID.ClickCell(cell, event.target.id);
        }
        else{

        }
    }
    
    renderCard(tile){
        if(!tile){return;}

        const cat = window.data.cats.find(x => x.id == tile.catId);
        const img = window.IMG.raw(tile.img);
        return `
        <figure id="${tile.id}" class="card card--${cat.color}">
            ${img}
            <div class="triangle"></div>
            <figcaption class="card__caption">
                <div class="card__image-container">
                    <h3 class="card__type">${cat.name}</h3>
                </div>
                <h1 class="card__name">${tile.name}</h1>
                <table class="card__stats">
                    <tbody>
                    <tr>
                        <th>Defense</th>
                        <td>60</td>
                    </tr>
                    </tbody>
                </table>
                
                <div class="card__abilities">
                <h4 class="card__ability">
                    <span class="card__label">Ability</span>
                    Absorb
                </h4>
                <h4 class="card__ability">
                    <span class="card__label">Hidden Ability</span>
                    Hydration
                </h4>
                </div>
            </figcaption>
        </figure>`;
    }

    GrabCard(tileId){
        let tile = tileId ? data.tiles.find(x => x.id == tileId) : null;
        window.GRID.items.forEach(cell => {
            window.GRID.SetTileValidity(cell, tileId ? tile.buildon.includes(String(cell.tileId)) : true);
        });
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
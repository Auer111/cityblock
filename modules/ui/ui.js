import Utils from "/modules/Utils.js"

export class UI{
    constructor(data){
        new Utils().loadCss(import.meta.url);
        window.UI = this;
        this.isMouseDown = false;
        this.isDragging = false;
        this.Init(data);
    }

    Init(data){
        const catsWrapperEl = window.document.getElementById("cats");
        data.cats.forEach(cat => {
            if(!cat.name){return;}
            var el = document.createElement('div');
            el.innerHTML = `
            <button class="button-19 ${cat.color}" role="button" onClick='window.UI.SelectCat(${cat.id})'>
                <i class="fa-solid fa-${cat.icon} fa-fw"></i>
            </button>`;
            catsWrapperEl.appendChild(el);
        });

        ['mousedown', 'touchstart'].forEach(e => {
            document.addEventListener(e, function (event) {
                window.UI.mouseDown = true;
            });
        });
        ['mouseup', 'touchend'].forEach(e => {
            document.addEventListener(e, function (event) {
                window.UI.mouseDown = false;
                window.UI.isDragging = false;
                window.UI.SelectTile(null,null);
            });
        });
        ['mousemove', 'touchmove'].forEach(e => {
            document.addEventListener(e, (event) => {
                if(window.UI.mouseDown){
                    window.UI.isDragging = true;
                }
            });
        });
        
    }

    mouseAction(){
        
    }

    renderCardDeck(){
        window.document.getElementById("cards").innerHTML = this.renderCard(window.SelectedCard);
    }

    renderCard(tile){
        if(!tile){return;}

        const cat = window.data.cats.find(x => x.id == tile.catId);
        return `
        <figure class="card card--${cat.color}">
            ${window.IMG.raw(tile.img)}
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

    SelectCat(id){
        var container = window.document.getElementById("current-cat");
        container.innerHTML = "";
        data.tiles.forEach(t => {
            if(t.catId == id){
                let el = document.createElement('div');
                el.innerHTML = `
                <button onClick="window.UI.SelectTile(this,${t.id})">
                    <img src='/modules/img/${t.img}'/>
                </button>`;
                container.prepend(el);
            }
        });
    }

    SelectTile(that,id){
        window.document.querySelectorAll('button.selected').forEach(i => i.classList.remove('selected'));
        that?.classList.add('selected');
    
        let tile = id ? data.tiles.find(x => x.id == id) : null;
        window.GRID.items.forEach(cell => {
            this.SetTileValidity(cell, id ? tile.buildon.includes(String(cell.tileId)) : true);
        });

        window.SelectedTile = tile;
        let cards = window.document.getElementById("cards");
        let card = window.UI.renderCard(tile);
        cards.innerHTML = card ?? "";
    }
    
    ClickCell(id){  
        if(!window.GRID || !window.SelectedTile){return;}
        const cell = window.GRID.items.find(x => x.gridId == id);
        if(cell.el.classList.contains("valid")){
            cell.tileId = SelectedTile.id;
            cell.img = window.IMG.render(SelectedTile.img, SelectedTile.name);
            cell.el.querySelector(".img-wrapper").replaceWith(cell.img);
        }
        if(window.SelectedTile){
            this.SetTileValidity(cell, SelectedTile.buildon.includes(String(cell.tileId)));
        }
    }

    SetTileValidity(cell, isValid){
        if(isValid){
            cell.el.classList.add("valid");
            cell.el.classList.remove("invalid");
        }
        else{
            cell.el.classList.add("invalid");
            cell.el.classList.remove("valid");
        }
    }
}

export default UI;
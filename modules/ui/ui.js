import Utils from "/modules/Utils.js"

export class UI{
    constructor(data){
        new Utils().loadCss(import.meta.url);
        window.UI = this;

        this.Init(data);
    }

    Init(data){
        const catsWrapperEl = window.document.getElementById("cats");
        data.cats.forEach(cat => {
            if(!cat.name){return;}

            console.log("data cat:"+cat.name);
            var el = document.createElement('div');
            el.innerHTML = `
            <button class="button-19 ${cat.color}" role="button" onClick='window.UI.SelectCat(${cat.id})'>
                <i class="fa-solid fa-${cat.icon} fa-fw"></i>
            </button>`;
            catsWrapperEl.appendChild(el);
        });
    }

    renderCardDeck(){
        window.document.getElementById("cards").innerHTML = this.renderCard(window.SelectedCard);
    }

    renderCard(tile){
        if(!tile){
            console.warn("No Card Found!");
            return;
        }

        const cat = window.data.cats.find(x => x.id == tile.category);
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
                <tbody><tr>
                    <th>HP</th>
                    <td>130</td>
                </tr>
                <tr>
                    <th>Attack</th>
                    <td>65</td>
                </tr>
                
                <tr>
                    <th>Defense</th>
                    <td>60</td>
                </tr>
            
                <tr>
                    <th>Special Attack</th>
                    <td>110</td>
                </tr>
                <tr>
                    <th>Special Defense</th>
                    <td>95</td>
                </tr>
                <tr>
                    <th>Speed</th>  
                    <td>65</td>
                </tr>
                </tbody></table>
                
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
            if(t.category == id){
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
        that.classList.add('selected');
    
        const tile = data.tiles.find(x => x.id == id);
        window.GRID.items.forEach(t => {
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
        window.document.getElementById("cards").innerHTML = window.UI.renderCard(tile);
    }
    
    ClickGridTile(id){  
        if(!window.GRID || window.SelectedTile == null){return;}
        
        const item = window.GRID.items.find(x => x.gridId == id);
        if(item.el.classList.contains("can-place")){
            item.tileId = SelectedTile.id;
            item.img = window.IMG.render(SelectedTile.img, SelectedTile.name);
            item.el.querySelector(".img-wrapper").replaceWith(item.img);
        }
    }
}

export default UI;
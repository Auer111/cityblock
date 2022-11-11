import Utils from "../Utils.js"

export class UI{
    constructor(data){
        new Utils().loadCss(import.meta.url);
        window.UI = this;

        this.init(data);
        this.cursor();
    }

    init(data){
        
        window.document.getElementById("cards").innerHTML = Array(5)
        .fill()
        .map((i) => this.renderCard(data.tiles[1]))
        .join('');

        interact('.card').draggable({
            listeners: {
              start (event) {
                var target = event.target;
                window.UI.GrabCard(target.id);
                window.UI.cursorEl.src = target.querySelector("img").src;
                target.hidden = true;
                document.body.classList.add("hide-cursor");
              },
              move (event) {},
              end (event){
                var target = event.target;
                target.hidden = false;
                window.UI.cursorEl.src = "";
                document.body.classList.remove("hide-cursor");
                if(event.dropzone){
                    event.target.remove();
                }
                else{

                }
              }
            }
        });
    }

    cursor(){
        const cursor = document.createElement(`img`);
        cursor.id = "cursor";
        this.cursorEl = cursor;
        document.body.prepend(cursor);
        window.addEventListener('mousemove', (e)=> {
            cursor.style.transform = `translate3d(${e.clientX - (cursor.width/2)}px, ${e.clientY - (cursor.height/2)}px, 0)`;
        });
    }
      
    

    renderCard(tile){
        if(!tile){return;}

        const cat = window.data.cats.find(x => x.id == tile.catId);
        return `
        <figure id="${tile.id}" class="card card--${cat.color}">
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

    GrabCard(tileId){
        let tile = tileId ? data.tiles.find(x => x.id == tileId) : null;
        window.GRID.items.forEach(cell => {
            window.GRID.SetTileValidity(cell, tileId ? tile.buildon.includes(String(cell.tileId)) : true);
        });
    }
    
    

    
}

export default UI;
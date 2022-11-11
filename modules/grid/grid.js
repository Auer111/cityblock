import Utils from "/modules/Utils.js"

export class Isometric{
    constructor(rows, cols, items){
        new Utils().loadCss(import.meta.url);
        window.GRID = this;

        this.rows = rows;
        this.cols = cols;
        this.items = items;
        this.Init();
    }

    Init(){
        document.getElementById("hero").children[0].appendChild(this.render());
    
        interact(".dropzone").dropzone({
            ondrop: function (event) {
                console.log(event, event.target.id, event.relatedTarget.id);
                window.GRID.ClickCell(event.target.id, event.relatedTarget.id);
            }
        }).on('dropactivate', function (event) {
            
        });
    }

    render(){
        let grid = document.createElement("div");
        grid.id = "grid";
        let i = 0;
        outer: for(let x = 0; x < this.rows; x++){
            let row = document.createElement("div");
            row.style.marginLeft = `${-77* x}px`;
            row.classList = "row";
            for(let y = 0; y < this.cols; y++){

                if(i >= this.items.length){ 
                    break outer; 
                }

                let cell = document.createElement("div");
                cell.classList = `cell cell${x}-${y}`;

                cell.style.zIndex = 1000 - x - y;

                cell.innerHTML = this.createCellEventLayer(`.cell${x}-${y} > .img-wrapper`, this.items[i]);
                cell.appendChild(this.items[i].img);
                row.appendChild(cell);

                this.items[i].el = cell;
                i++;
            }
            grid.prepend(row);
        }

        return grid;
    }

    createCellEventLayer(target, cell){
        return `
        <div class="overlay">
            <div>
                <div id="${cell.gridId}" class="dropzone"></div>
            </div>
        </div>`;
    }

    ClickCell(cellId, tileId){
        if(!window.GRID || !cellId || !tileId){return;}
        const cell = window.GRID.items.find(x => x.gridId == cellId);
        if(cell.el.classList.contains("valid")){
            let selectedTile = data.tiles.find(x => x.id == tileId);

            cell.tileId = selectedTile.id;
            cell.img = window.IMG.render(selectedTile.img, selectedTile.name);
            cell.el.querySelector(".img-wrapper").replaceWith(cell.img);
        }
        window.GRID.items.forEach(cell => {
            this.SetTileValidity(cell, true);
        });
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

export default Isometric;
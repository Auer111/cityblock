import Utils from "../Utils.js"

export class Isometric{
    constructor(rows, cols, items){
        new Utils().loadCss(import.meta.url);
        window.GRID = this;
        this.rows = rows;
        this.cols = cols;
        this.items = items;
        this.init();
    }

    init(){
        document.getElementById("hero").children[0].appendChild(this.render());
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
                this.items[i].x = x;
                this.items[i].y = y;
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

    SetGridValidity(isValid, tile){
        window.GRID.items.forEach(cell => {
            isValid = tile ? tile.buildon.includes(String(cell.tileId)) : isValid;
            cell.el.classList.toggle('valid', isValid);
            cell.el.classList.toggle('invalid', !isValid);
        });
    }
}

export default Isometric;
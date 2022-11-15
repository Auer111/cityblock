import Utils from "../Utils.js"

export class Isometric{
    constructor(rows, cols, items){
        new Utils().loadCss(import.meta.url);
        this.rows = rows;
        this.cols = cols;
        this.items = items;
    }

    render(){
        let grid = document.createElement("div");
        grid.classList.add("grid");
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

                cell.innerHTML = this.createCellEventLayer(this.items[i]);
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

    createCellEventLayer(cell){
        return `
        <div class="overlay">
            ${cell.overlay ? cell.overlay : ""}
            <div>
                <div id="${cell.gridId}" class="dropzone"></div>
            </div>
        </div>`;
    }

    SetGridValidity(isValid, tile){
        this.items.forEach(cell => {
            isValid = tile ? this.isValidNeighborCells(cell, tile) : isValid;
            cell.el.classList.toggle('valid', isValid);
            cell.el.classList.toggle('invalid', !isValid);
        });
    }

    isValidNeighborCells(cell,tile){
        var dirs = [[0,0,0],[1,0,1],[2,-1,0],[3,0,-1],[4,1,0]];
        for (let i = 0; i < dirs.length; i++) {
            if(!this.checkDirection(cell,tile,dirs[i][0],dirs[i][1],dirs[i][2])){
                return false;
            }
        }
        return true;
    }

    checkDirection(cell, tile, validAll, x, y){
        const required = tile.validAll[validAll];
        const neighbor = this.canGetNeightborCell(cell, x, y);
        const outOfBounds = required != -1 && !neighbor;
        const invaidSquare = required != -1 && neighbor && required != this.getNeightborCellTileId(cell, x, y);
        if(outOfBounds || invaidSquare){
            return false;
        }
        return true;
    }

    canGetNeightborCell(cell ,offX, offY){
        if(cell.y + offY >= this.cols){return false;}
        if(cell.y + offY < 0){return false;}
        if(cell.x + offX >= this.rows){return false;}
        if(cell.x + offX < 0){return false;}
        return true;
    }

    getNeightborCellTileId(cell ,offX, offY){
        let nX = cell.x + offX;
        let nY = cell.y + offY;
        return this.items[(nX * this.rows) + nY].tileId;
    }
}

export default Isometric;
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
            isValid = tile ? isValidNeighborCells(cell) == cell.tileId : isValid;
            cell.el.classList.toggle('valid', isValid);
            cell.el.classList.toggle('invalid', !isValid);
        });
    }

    isValidNeighborCells(cell){
        const current = cell.buildon[0];
        if(current != 0 
            && current != this.getNeightborCell(cell, 0, 0)){
            return false;
        }
        const up = cell.buildon[1];
        if(up != -1 
            && this.canGetNeightborCell(cell, 0, 1)
            && up != this.getNeightborCell(cell, 0, 1)){
            return false;
        }
        const right = cell.buildon[2];
        if(right != -1
            || this.canGetNeightborCell(cell, -1, 0)
            || right != this.getNeightborCell(cell, -1, 0)){
            return false;
        }
        const down = cell.buildon[3];
        if(down != -1 
            && this.canGetNeightborCell(cell, 0, -1)
            && down != this.getNeightborCell(cell, 0, -1)){     
            return false;
        }
        const left = cell.buildon[4];
        if(left != -1
            && this.canGetNeightborCell(cell, 1, 0)
            && left != this.getNeightborCell(cell, 1, 0)){
            return false;
        }
        return true;
    }

    canGetNeightborCell(cell ,offX, offY){
        if(cell.y + offY >= this.cols){return false;}
        if(cell.y + offY <= 0){return false;}
        if(cell.x + offX >= this.rows){return false;}
        if(cell.x + offX <= 0){return false;}
        return true;
    }

    getNeightborCell(cell ,offX, offY){
        let nX = cell.x + offX;
        let nY = cell.y + offY;
        return this.items[(nX * this.rows) + nY];
    }
}

export default Isometric;
import Utils from "../Utils.js"

export class Isometric{
    constructor(rows, cols, items){
        new Utils().loadCss(import.meta.url);
        this.rows = rows;
        this.cols = cols;
        this.items = items;
        this.dragEl = null;
        this.cellSize = 76;
    }

    render(){
        let grid = document.createElement("div");
        grid.classList.add("grid");
        let i = 0;
        outer: for(let x = 0; x < this.rows; x++){
            let row = document.createElement("div");
            row.style.marginLeft = `${-this.cellSize* x}px`;
            row.classList = "row";
            for(let y = 0; y < this.cols; y++){

                if(i >= this.items.length){ 
                    break outer; 
                }

                let cell = document.createElement("div");
                cell.classList = `cell cell-${x}-${y}`;
                if(x === this.cols - 1 && y === 0){
                    cell.classList.add("grid-left");
                }

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

    sizeGrid(grid){
        const parent = grid.parentElement;
        parent.style.paddingLeft = `${this.cellSize * (this.cols - 1)}px`;
        parent.style.paddingRight = `${this.cellSize}px`;
        parent.style.paddingBottom = `${this.cellSize}px`;
        grid.style.marginTop = `${-this.cellSize}px`;
    }

    makeDraggable(querySelector){
        this.dragEl = document.querySelector(querySelector);
        this.dragEl.style.pointerEvents = 'all';
        this.dragEl.style.touchAction = 'auto';
        const rect = this.dragEl.getBoundingClientRect();

        interact(querySelector).draggable({
            modifiers: [
              interact.modifiers.restrictRect({
                restriction: {
                  top: -rect.height / 2, 
                  right: document.scrollingElement.clientWidth + (rect.width / 2), 
                  bottom: document.scrollingElement.clientHeight + (rect.height / 2), 
                  left: -rect.width / 2
                }
              })
            ],
            listeners: {
              start (event) {window.GRID.dragstart(event);},
              move (event) {window.GRID.drag(event)},
              end (event){window.GRID.dragend(event);}
            }
        });
      }
    
    dragstart(event){
      //console.log("start drag", el);
    }
    drag(event){
      var target = event.target
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
    
      // translate the element
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    
      // update the posiion attributes
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
    }
    dragend(event){
    
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
            isValid = tile ? this.isValidAllNeighborCells(cell, tile) : isValid;
            cell.el.classList.toggle('valid', isValid);
            cell.el.classList.toggle('invalid', !isValid);
        });
    }

    isValidAllNeighborCells(cell,tile){
        var dirs = [[0,0,0],[1,0,1],[2,-1,0],[3,0,-1],[4,1,0]];
        for (let i = 0; i < dirs.length; i++) {
            if(!this.isAdjacentTileValid(cell,tile,dirs[i][0],dirs[i][1],dirs[i][2])){
                return false;
            }
        }
        return this.isValidAnyNeighborCells(cell, tile);
    }

    isAdjacentTileValid(cell, tile, validAll, x, y){
        const required = tile.validAll[validAll];
        const neighbor = this.canGetNeightborCell(cell, x, y);
        const outOfBounds = required != -1 && !neighbor;
        const invaidSquare = required != -1 && neighbor && required != this.getNeightborCellTileId(cell, x, y);
        if(outOfBounds || invaidSquare){
            return false;
        }
        return true;
    }

    isValidAnyNeighborCells(cell,tile){
        
        let lookingFor = [...tile.validAny];

        var dirs = [[0,1],[-1,0],[0,-1],[1,0]];
        for (let i = 0; i < dirs.length; i++) {
            if(!this.canGetNeightborCell(cell, dirs[i][0], dirs[i][1])){
                continue;
            }
            let neighborId = this.getNeightborCellTileId(cell, dirs[i][0], dirs[i][1]);
            let remove = lookingFor.findIndex(id => id == neighborId);
            if(remove != -1){
                lookingFor.splice(remove,1);
            }
        }
        return lookingFor.length === 0;
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
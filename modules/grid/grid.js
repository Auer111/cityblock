import Utils from "/modules/Utils.js"

export class Isometric{
    constructor(rows, cols, items){
        new Utils().loadCss(import.meta.url);

        this.rows = rows;
        this.cols = cols;
        this.items = items;
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

                let overlay = this.overlay(`.cell${x}-${y} > img`, this.items[i].click);

                cell.appendChild(overlay);
                cell.appendChild(this.items[i].img);
                row.appendChild(cell);
                i++;
            }
            grid.prepend(row);
        }

        return grid;
    }

    overlay(target, onclick){
        let inner = document.createElement('div');

        inner.addEventListener('mouseover', ()=> {
            let el = document.querySelector(target);
            el.classList.remove('unhover');
            el.classList.add('hover');
        });
        inner.addEventListener('click', onclick);
        inner.addEventListener('mouseout', ()=> {
            let el = document.querySelector(target);
            el.classList.remove('hover');
            el.classList.add('unhover');
        });

        let mid = document.createElement('div');
        mid.prepend(inner);
        let top = document.createElement('div');
        top.prepend(mid);
        top.classList = 'overlay';
        return top;
    }
}

export default Isometric;
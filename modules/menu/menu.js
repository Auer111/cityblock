import Isometric from "../grid/grid.js";
import {Campaign} from "../campaign.js"
import Data from "../data.js";

export class Menu {
    constructor(){
        window.UTILS.loadCss(import.meta.url);
        window.MENU = this;
        this.active = null;
        this.sections = {}; //page/window
        this.Main = new Main();
        this.extractHtmlSections();
    }

    //delete all sections from index.html and store them in the sections dictionary
    extractHtmlSections(){
        [...document.querySelectorAll('section')].forEach(s=> 
        {
            this.sections[s.id] = s.outerHTML;
            document.getElementById(s.id).remove();
        });
    }

    //deletes active section html and inserts desired section
    renderSection(showEl){
        if(showEl === window.MENU.active){return;}
        if(this.active){
            const active = document.getElementById(this.active);
            active.remove();
        }
        
        document.body.insertAdjacentHTML('beforeend', this.sections[showEl]);
        this.active = showEl;
    }
}
class Main{
    constructor(){
        new Data().init(this.render);
    }

    render(){
        window.MENU.renderSection('main-menu');

        const startTile = window.DATA.data.tiles[0];
        var items = new Array(9).fill()
        .map((item,index) => ({ 
            gridId: index, 
            tileId: startTile.id, 
            img: window.IMG.render(startTile.img)
        }));

        const grid = new Isometric(3,3,items);
        const gridEl = grid.render();
        document.querySelector('#main-menu .iso').appendChild(gridEl);
        grid.sizeGrid(gridEl);
    }

    onClickCampaign(){
        window.MENU.renderSection('play-area');
        new Campaign().init();
    }
}
export default Menu;
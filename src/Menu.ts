// import Isometric from "../grid/grid.js";
// import {Campaign} from "../campaign/campaign.js"
// import Data from "../data.js";

import { _Campaign } from "./Campaign";
import { _Data } from "./Data";
import Isometric from "./grid";

export class Menu {
    active : string | null;
    sections : any;
    Main : Main;
    Next : Next;
    constructor(){
        this.active = null;
        this.sections = {}; //page/window
        this.Main = new Main();
        this.Next = new Next();
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
    renderSection(showEl : string){
        if(showEl === this.active){return;}
        if(this.active){
            const active = document.getElementById(this.active);
            active.remove();
        }
        
        document.body.insertAdjacentHTML('beforeend', this.sections[showEl]);
        this.active = showEl;
    }
}
class Main
{
    constructor(){
        this.render();
    }

    render(){
        _Menu.renderSection('main-menu');

        const grid = new Isometric(3,3,new Array(9).fill(_Data.tiles[0]));

        document.querySelector('#main-menu .iso').appendChild(grid.el);
        grid.sizeGrid(grid.el);
    }

    onClickCampaign(){
        _Menu.renderSection('play-area');
    }
}
class Next{
    constructor(){}
    html(){
        return `
        <div class="next">
            <button onClick="window.MENU.Next.onClick()" class="button-19 green">Next</button>
        </div>`;
    }
    onClick(){
        _Campaign.loadNextLevel();
    }
}
export const _Menu = new Menu();
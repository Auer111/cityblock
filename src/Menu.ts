import "./css/menu.css"
import './extensions'
import { _Campaign } from "./Campaign";
import { _Data } from "./Data";
import Isometric from "./Grids";

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
        
    }

    render(){
        _Menu.renderSection('main-menu');
        document.querySelector('#main-menu button').addEventListener('click', ()=>{_Menu.Main.onClickCampaign()});

        const grid = new Isometric(3,3,new Array(9).fill(_Data.tiles[0]));

        document.querySelector('#main-menu .iso').appendChild(grid.el);
        grid.sizeGrid(grid.el);
    }

    onClickCampaign(){
        _Menu.renderSection('play-area');
        _Campaign.loadLevel(0);
    }
}
class Next{
    el:HTMLElement;
    constructor(){
        this.el = `
        <div class="next">
            <button class="button-19 green">Next</button>
        </div>`.ToEl();
        this.el.addEventListener('click', ()=>{_Menu.Next.onClick()})
    }
    onClick(){
        _Menu.renderSection('play-area');
        _Campaign.loadNextLevel();
    }
}
export const _Menu = new Menu();
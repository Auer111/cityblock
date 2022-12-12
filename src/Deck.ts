import { _Campaign } from "./Campaign";
import { _Data } from "./Data";
import { Tile } from "./Tile";

export class Deck{

    cards: Tile[] = [];
    constructor(tiles:Tile[]){
        this.cards = tiles;
        tiles.length === 0 ? _Campaign.level.hand : tiles;
    }

    render():HTMLElement
    {
        return `
            <figure id="deck" class="card">
                ${this.renderResources().outerHTML}
            </figure>`.ToEl();
    }

    renderResources(){
        _Campaign.grid.cells.forEach(c => c.refreshResourceValues());

        return `<div id="resources row">${_Data.resources.map(r => {
            return `${r.render().outerHTML}`;
        }).join('')}</div>`.ToEl();

    }
}
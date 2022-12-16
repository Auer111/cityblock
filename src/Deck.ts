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

            </figure>`.ToEl();
    }

    renderResources(){


    }
}
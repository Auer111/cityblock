import { _Campaign } from "./Campaign";
import { Tile } from "./Tile";

export class Deck{

    cards: Tile[] = [];
    constructor(){
        this.cards = _Campaign.level.deck;
    }

    render():HTMLElement
    {
        if(this.cards.length == 0){
            return `
            <div id="deck">
                <img src="./img/ui/pouch.png" />
                <img class="back" src="./img/ui/pouch_back.png" />
            </div>`.ToEl();
        }

        const card =  this.cards[0];
        return `
            <div id="deck">
                <img src="./img/ui/pouch.png" />
                <figure id="${card.id}" class="card deck card--${card.category.color}"></figure>
                <img class="back" src="./img/ui/pouch_back.png" />
            </div>`.ToEl();
    }
}
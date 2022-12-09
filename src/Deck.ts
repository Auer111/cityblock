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
            return `<figure class="card deck">
                <center>
                    <span>Empty Deck<span>
                </center>
            </figure>`.ToEl();
        }

        const card =  this.cards[0];
        return `<div class="deck-bg">
        <img src="./img/ui/panel_blue.png" />
            <figure id="${card.id}" class="card deck card--${card.category.color}">
                    
            </figure>
        </div>`.ToEl();
    }
}
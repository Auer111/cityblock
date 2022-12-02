import { _Data } from "./Data";
import { Tile } from "./Tile";
import { _UI } from "./Ui";

let _levelIterator = 0;
export class Level
{
    public id: number = _levelIterator++;
    public label:string;
    public hand: Tile[];
    public handUnlimited:Tile[];
    public locked:Tile[];
    public objective:Tile;
    public size: number;
    public constructor(init?:Partial<Level>) {
        Object.assign(this, init);
    }

    complete(){
        return this.hand.length === 0;
    }

    getHand(){
        return [...this.handUnlimited, ...this.hand];
    }

    addCard(tileId: number){
        if(this.handUnlimited.find(u => u.id == tileId) === undefined){
            this.hand = [...this.hand, _Data.tiles.find(x => x.id == tileId)];
        }
        _UI.renderHand();
    }

    removeCard(tileId: number){
        if(this.handUnlimited.find(u => u.id == tileId) === undefined){
            const remove = this.hand.findIndex(x => x.id == tileId);
            if(remove > -1){
                this.hand.splice(remove,1);
            }
        }

        _UI.renderHand();
    }

    getCountHtml(tile : Tile) : string 
    {
        const count = this.handUnlimited.includes(tile) ? -1 : this.hand.filter(t => t.id == tile.id).length;
        switch(count){
            case -1: return `<div class="count"><i class="fa-solid fa-fw fa-infinity"></i></div>`;
            case 0:
            case 1: return "";
            default: return `<div class="count">${count}</div>`;
        }
    }
}
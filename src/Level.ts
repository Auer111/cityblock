import { Tile } from "./Tile";

export class Level
{
    public id: number;
    public label:string;
    public hand: Tile[];
    public handUnlimited:Tile[];
    public locked:Tile[];
    public objective:Tile;
    public size: number;
    public constructor(init?:Partial<Level>) {
        Object.assign(this, init);
    }

    getHand(){
        return [...this.handUnlimited, ...this.hand];
    }

    // getHandTileCount(tile){
    //     return this.handUnlimited.includes(tile) ? -1 : this.hand.filter(t => t.id == tile.id).length;
    // }

    // addCard(tileId){
    //     if(this.handUnlimited.find(u => u.tileId == tileId) === undefined){
    //         this.hand = [...this.hand, this.data.tiles.find(x => x.id == tileId)];
    //     }
    //     window.UI.renderHand();
    // }

    // removeCard(tileId){
    //     if(this.handUnlimited.find(u => u.tileId == tileId) === undefined){
    //         const remove = this.hand.findIndex(x => x.id == tileId);
    //         if(remove > -1){
    //             this.hand.splice(remove,1);
    //         }
    //     }

    //     window.UI.renderHand();
    // }
}
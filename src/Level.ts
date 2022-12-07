import { _Campaign } from "./Campaign";
import { _Data } from "./Data";
import { Tile } from "./Tile";
import { TileToCell } from "./TileToCell";
import { _UI } from "./Ui";

let _levelIterator = 0;
export class Level
{
    public id: number = _levelIterator++;
    public label:string;
    public hand: Tile[];
    public deck:Tile[];
    public objective:Tile;
    public size: number;
    public cells: TileToCell[];
    public constructor(init?:Partial<Level>) {
        Object.assign(this, init);
        this.hand = Tile.select([1]);
    }

    complete(){
        const gridHasTile = _Campaign?.grid?.cells.find(c=>c.tile === this.objective);
        return gridHasTile !== undefined && gridHasTile !== null;
    }

    getHand(){
        return [...this.hand];
    }

    drawCard(tileId: number){
        this.hand = [...this.hand, _Data.tiles.find(x => x.id == tileId)];
        _UI.renderHand();
    }

    removeCard(tileId: number){
        const remove = this.hand.findIndex(x => x.id == tileId);
        if(remove > -1){
            this.hand.splice(remove,1);
        }

        _UI.renderHand();
    }

    getCountHtml(tile : Tile) : string 
    {
        const count = this.hand.filter(t => t.id == tile.id).length;
        switch(count){
            case -1: return `<div class="count"><i class="fa-solid fa-fw fa-infinity"></i></div>`;
            case 0:
            case 1: return "";
            default: return `<div class="count">${count}</div>`;
        }
    }
}
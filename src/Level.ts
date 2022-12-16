import { _Campaign } from "./Campaign";
import { _Data } from "./Data";
import { Tile, TileType } from "./Tile";
import { TileToCell } from "./TileToCell";
import { _UI } from "./Ui";

let _levelIterator = 0;
export class Level
{
    public id: number = _levelIterator++;
    public label:string;
    public hand: Tile[];
    public deckTiles:TileType[] = [];
    public objective:Tile;
    public size: number;
    public cells: TileToCell[];
    public constructor(init?:Partial<Level>) {
        Object.assign(this, init);
    }

    complete(){
        const gridHasTile = _Campaign?.grid?.cells.find(c=>c.tile === this.objective);
        return gridHasTile !== undefined && gridHasTile !== null;
    }
}
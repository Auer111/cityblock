import { _Campaign } from "./Campaign";
import { _Data } from "./Data";
import { ResourceType } from "./Resource";
import { Tile, TileType } from "./Tile";
import { TileToCell } from "./TileToCell";
import { _UI } from "./Ui";

let _levelIterator = 0;
export class Level
{
    public id: number = _levelIterator++;
    public label:string;
    public startingTiles:TileType[] = [];
    public objective:TileType;
    public size: number;
    public cells: TileToCell[];
    public resources: ResourceType[] = [];
    public constructor(init?:Partial<Level>) {
        Object.assign(this, init);
        //Tile.many(this.startingTiles).forEach(t => t.produces.forEach(r => this.resources.push(r)));
    }

    complete(){
        const gridHasTile = _Campaign?.grid?.cells.find(c=>c.tile.type === this.objective);
        return gridHasTile !== undefined && gridHasTile !== null;
    }
}
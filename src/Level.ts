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
    public tiles: TileType[] = [];
    public constructor(init?:Partial<Level>) {
        Object.assign(this, init);
    }

    addResources(resources:ResourceType[]){
        resources.forEach(r => this.addResource(r));
    }
    addResource(resource:ResourceType){
        if(!this.resources.includes(resource)){
            this.resources.push(resource);
        }
    }

    addTiles(tiles:TileType[]){
        tiles.forEach(t => this.addTile(t));
    }
    addTile(tile:TileType){
        if(!this.tiles.includes(tile)){
            this.tiles.push(tile);
        }
    }

    complete(){
        const gridHasTile = _Campaign?.grid?.cells.find(c=>c.tile.type === this.objective);
        return gridHasTile !== undefined && gridHasTile !== null;
    }
}
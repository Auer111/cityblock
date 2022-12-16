import { Tile, TileType } from "./Tile";

export class TileToCell
{
    X: number;
    Y: number;
    type: TileType;

    constructor(x:number,y:number,type:TileType){
        this.X=x;
        this.Y=y;
        this.type=type;
    }
}
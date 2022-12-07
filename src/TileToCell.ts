import { Tile } from "./Tile";

export class TileToCell
{
    X: number;
    Y: number;
    Tile: Tile;

    constructor(x:number,y:number,tile:Tile){
        this.X=x;
        this.Y=y;
        this.Tile=tile;
    }
}
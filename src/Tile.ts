import Utils from "../modules/Utils";
import { _Campaign } from "./Campaign";
import { _Data } from "./Data";
import './extensions'
import { Resource, TileResource } from "./Resource";

let _tileIterator = 0;
export class Tile
{
    public id: number = _tileIterator++;
    public label:string;
    public imgPath: string;
    public upgradeIds: number[] = [];
    public placeOn: number[] = [0];
    public requiredNeighbors:number[] = [];
    public tileResources: TileResource[] = [];
    public hand:Tile[] = [];
    public handIds:number[] = [];
    public constructor(init?:Partial<Tile>) {
        Object.assign(this, init);
        this.imgPath = `./img/${this.imgPath ?? (this.label+'.png')}`;
    }

    static one(id:number):Tile
    {
        return _Data.tiles.find(x => x.id == id);
    }
    static many(ids:number[]):Tile[]
    {
        return ids.map(i=> Tile.one(i));
    }

    canPlace(tileId:number):boolean{
        return this.placeOn.find(t => t === tileId) !== undefined;
    }

    card() : HTMLElement 
    {        
        return `<figure id="${this.id}" class="card drag">
                    <div class="label bg">${this.label}</div>
                    <div class="label">${this.label}</div>
                    <end>
                        <img src="${this.imgPath}" />
                    </end>
            </figure>`
        .ToEl();
    };

    wrappedImg() : HTMLElement
    {
       return `
       <div class="img-wrapper">
            <img class="img ${this.label?.toLowerCase()}-animation" src="${this.imgPath}" />
        </div>`.ToEl();
    }

    
}


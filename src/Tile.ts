import Utils from "../modules/Utils";
import { _Campaign } from "./Campaign";
import { _Data } from "./Data";
import './extensions'
import { ResourceType } from "./Resource";

export enum TileType
{
    Grass,
    Camp,
    Forest,
    Lumbercamp,
    Mountian,
    Quarry,
    Water,
    Wheat,
    Blind,
    Blacksmith,
    Lodge,
    Windmill,
    Deer,
    Shack,
    Hut,
    House,
    Farm,
    Barn,
    Mill,
    Sawmill,
}

export class Tile
{
    public type: TileType;
    public label:string;
    public imgPath: string;
    public upgradeTypes: TileType[] = [];
    public placeOn: TileType[] = [TileType.Grass];
    public requiredNeighbors:TileType[] = [];
    public requires: ResourceType[] = [];
    public produces: ResourceType[] = [];
    public hand:Tile[] = [];
    public constructor(init?:Partial<Tile>) {
        Object.assign(this, init);
        this.label = this.label ?? TileType[this.type];
        this.imgPath = `./img/${this.imgPath ?? (this.label+'.png')}`;
    }

    static one(type:TileType):Tile
    {
        return _Data.tiles.find(x => x.type == type);
    }
    static many(types:TileType[]):Tile[]
    {
        return types.map(i=> Tile.one(i));
    }

    canPlace(type:TileType):boolean{
        return this.placeOn.find(t => t === type) !== undefined;
    }

    card() : HTMLElement 
    {        
        return `<figure id="${this.type}" class="card drag">
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


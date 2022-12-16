import Utils from "../modules/Utils";
import { _Campaign } from "./Campaign";
import { _Data } from "./Data";
import './extensions'
import { Resource, ResourceType } from "./Resource";

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
    HunterShack,
    Windmill,
    Deer,
    Flax,
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
    public autoUpgrades: TileType[] = [];
    public placeOn: TileType[] = [TileType.Grass];
    public requiredNeighbors:TileType[] = [];
    public requires: ResourceType[] = [];
    public produces: ResourceType[] = [];
    public constructor(type: TileType, init?:Partial<Tile>) {
        this.type = type;
        Object.assign(this, init);
        this.label = this.label ?? TileType[this.type];
        this.imgPath = `./img/tiles/${this.imgPath ?? (this.label+'.png')}`;
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
        const neededResources = this.requires.filter(r => !_Campaign.level.resources.includes(r));
        const unlocked = neededResources.length == 0;

        return unlocked
        ? `<figure id="${this.type}" class="card drag">
                    <div class="label bg">${this.label}</div>
                    <div class="label">${this.label}</div>
                    <end>
                        <img src="${this.imgPath}" />
                    </end>
            </figure>`
        .ToEl(): 
        `<figure id="${this.type}" class="card locked">
            <div>${neededResources.map(r => Resource.img(r)).join('')}</div>
            <div class="label">${this.label}</div>
            <end>
                <img src="${this.imgPath}" />
            </end>
        </figure>`
        .ToEl()
    };

    wrappedImg() : HTMLElement
    {
       return `
       <div class="img-wrapper">
            <img class="img ${this.label?.toLowerCase()}-animation" src="${this.imgPath}" />
        </div>`.ToEl();
    }

    
}


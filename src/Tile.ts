import Utils from "../modules/Utils";
import { _Campaign } from "./Campaign";
import { _Data } from "./Data";
import './extensions'
import { Resource, ResourceType } from "./Resource";

export enum TileType
{
    Grass,
    Grass_path_left,
    Grass_path_leftdown,
    Grass_path_leftright,
    Grass_path_up,
    Grass_path_updown,
    Grass_path_upleft,
    Grass_path_upright,
    Grass_path_right,
    Grass_path_rightdown,
    Grass_path_down,
    Grass_path_all,
    Dirt,
    Water,
    Camp,
    Forest,
    Lumbercamp,
    Mountian,
    Quarry,
    Wheat,
    Blind,
    Blacksmith,
    Windmill,
    Flax,
    Shack,
    Shack_hunter,
    Shack_reaper,
    Shack_reaper_wheat,
    Shack_reaper_flax,
    Weaver,
    Grainery,
    Fallow,
    House,
    Farm,
    Barn,
    Mill,
    Sawmill,
}

export class Tile
{
    public type: TileType;
    public base: TileType = TileType.Grass;
    public roadAccess: boolean = true;
    public roadRender: boolean = true;
    public label:string;
    public imgPath: string;
    public basePath: string;
    public autoUpgrades: TileType[] = [];
    public placeOn: TileType[] = [TileType.Grass];
    public requiredNeighbors:TileType[] = [];
    public requiredNeighborsAny:TileType[] = [];
    public requiredNeighborsAnyDebug:TileType[] = [];
    public requires: ResourceType[] = [];
    public produces: ResourceType[] = [];
    public maxAmount: number = 1;
    public placedAmount: number = 0;
    public constructor(type: TileType, init?:Partial<Tile>) {
        this.type = type;
        Object.assign(this, init);
        this.label = this.label ?? TileType[this.type];
        this.imgPath = `./img/tiles/${this.imgPath ?? (this.label+'.png')}`;
        this.basePath = `./img/tiles/${TileType[this.base]+'.png'}`;
        this.requiredNeighborsAnyDebug ??= this.requiredNeighborsAny;
    }

    static one(type:TileType):Tile
    {
        return _Data.tiles.find(x => x.type == type);
    }
    static many(types:TileType[]):Tile[]
    {
        return types.map(i=> Tile.one(i));
    }

    static fromResources(resources:ResourceType[]):Tile[]{
        if(resources == null){return [];}
        return _Data.tiles.filter(t => 
            t.requires.some(resource =>  resources.includes(resource))
        );
    }

    canPlace(type:TileType):boolean{
        return this.placeOn.find(t => t === type) !== undefined;
    }

    card() : HTMLElement 
    {        
        const neededResources = this.requires.filter(r => !_Campaign.level.resources.includes(r));
        const unlocked = neededResources.length == 0;

        const requiredNeighbors = Tile.many(this.requiredNeighbors);
        const requiredNeighborsAny = Tile.many(this.requiredNeighborsAny);
        return unlocked
        ? `<figure id="${this.type}" class="card drag">
                <div class="noValidCellsLabel label">
                    <h3>No Valid Tiles</h3>
                    <div>
                        <sub>Place on</sub>
                        ${Tile.many(this.placeOn).map(t => `<sub>${t.label}</sub>`)
                            .join('<br><sub>or </sub>')}</div>
                        ${requiredNeighbors.length > 0 || requiredNeighborsAny.length > 0 ? `<div><sub>Next to</sub>` : ''}
                        ${requiredNeighbors.map(t => `<sub>${t.label}</sub>`)
                            .join('<br><sub>and </sub>')}
                        ${Tile.many(this.requiredNeighborsAnyDebug).map(t => `<sub>${t.label}</sub>`)
                            .join('<br><sub>or </sub>')}
                    </div>
                </div>
                <div class="label bg">${this.label}</div>
                <div class="label">${this.label}</div>
                <center>
                    <img class="tile base" src="${this.basePath}" />
                    <img class="tile" src="${this.imgPath}" />
                </center>
            </figure>`
        .ToEl(): 
        `<figure id="${this.type}" class="card locked">
            <div class="resources">
                ${Resource.img(neededResources[0])}
            </div>
            <div class="label">
                <h1>${this.label}</h1>
                <sub>Requires ${Resource.label(neededResources[0])}</sub>
            </div>
        </figure>`
        .ToEl()
    };

    wrappedImg() : HTMLElement
    {
       return `
       <div class="img-wrapper">
            ${this.type === this.base ? "" : `<img class="img base" src="${this.basePath}" />`}
            <img class="img ${this.label?.toLowerCase()}-animation" src="${this.imgPath}" />
        </div>`.ToEl();
    }

    
}


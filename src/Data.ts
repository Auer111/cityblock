
import { Tile, TileType } from './Tile';
import{ Level }from './Level';
import { TileToCell } from './TileToCell';
import { ResourceType } from './Resource';
export class Data
{
    tiles : Tile[];
    resources : ResourceType[];
    levels : Level[];
    constructor(){}

    seed(){

        this.tiles = [
            new Tile(TileType.Grass,{
                roadAccess: false
            }),
            new Tile(TileType.Water,{
                base: TileType.Water,
                roadAccess: false
            }),
            new Tile(TileType.Forest,{
                roadAccess: false
            }),
            new Tile(TileType.Mountian,{
                roadAccess: false
            }),
            new Tile(TileType.Camp,{
                requiredNeighborsAny:[TileType.Forest, TileType.Mountian],
                autoUpgrades:[TileType.Lumbercamp,TileType.Quarry],
                requires: [ResourceType.Humans],
            }),
            new Tile(TileType.Lumbercamp,{
                requiredNeighbors:[TileType.Forest],
                produces:[ResourceType.Wood]
            }),
            new Tile(TileType.Quarry,{
                requiredNeighbors:[TileType.Mountian],
                requires: [ResourceType.Tools,ResourceType.Humans],
                produces: [ResourceType.Stone],
            }),
            new Tile(TileType.Shack,{
                requires: [ResourceType.Wood],
                produces: [ResourceType.Serf],
                autoUpgrades:[TileType.Shack_hunter, TileType.Shack_reaper],
            }),
            
            new Tile(TileType.Shack_reaper,{
                base: TileType.Dirt,
                roadRender: false,
                requiredNeighbors:[TileType.Fallow],
                produces: [ResourceType.Reaper,ResourceType.Serf],
                autoUpgrades:[TileType.Shack_reaper_wheat, TileType.Shack_reaper_flax],
            }),
            new Tile(TileType.Shack_reaper_wheat,{
                base: TileType.Dirt,
                roadRender: false,
                requiredNeighbors:[TileType.Wheat],
                produces: [ResourceType.Reaper,ResourceType.Serf],
            }),
            new Tile(TileType.Shack_reaper_flax,{
                base: TileType.Dirt,
                roadRender: false,
                requiredNeighbors:[TileType.Flax],
                produces: [ResourceType.Reaper,ResourceType.Serf],
            }),
            new Tile(TileType.Weaver,{
                requiredNeighborsAny:[TileType.Flax, TileType.Shack_reaper_flax],
                requiredNeighborsAnyDebug:[TileType.Flax],
                requires:[ResourceType.Flax],
                produces: [ResourceType.Fabric],
            }),
            new Tile(TileType.Fallow,{
                base: TileType.Dirt,
                roadRender: false,
                maxAmount: 2,
                requiredNeighborsAny:[TileType.Shack, TileType.Shack_reaper, TileType.Shack_reaper_wheat, TileType.Shack_reaper_flax],
                requiredNeighborsAnyDebug:[TileType.Shack],
                requires: [ResourceType.Serf],
                produces: [ResourceType.Reaper,ResourceType.Serf],
            }),
            new Tile(TileType.Wheat,{
                base: TileType.Dirt,
                roadRender: false,
                placeOn: [TileType.Fallow],
                requires: [ResourceType.Reaper],
                produces: [ResourceType.Wheat,ResourceType.Reaper,ResourceType.Serf],
            }),
            new Tile(TileType.Flax,{
                base: TileType.Dirt,
                roadRender: false,
                placeOn: [TileType.Fallow],
                requires: [ResourceType.Reaper],
                produces: [ResourceType.Flax,ResourceType.Reaper,ResourceType.Serf],
            }),
            new Tile(TileType.Blacksmith,{
                requires: [ResourceType.Wood,ResourceType.Serf],
                produces: [ResourceType.Tools],
            }),
            new Tile(TileType.Grainery,{
                requiredNeighborsAny:[TileType.Wheat,TileType.Shack_reaper_wheat],
                requiredNeighborsAnyDebug:[TileType.Wheat],
                requires: [ResourceType.Reaper],
                produces: [ResourceType.Wheat],
            }),
            new Tile(TileType.Shack_hunter,{
                label:"Hunter's Shack",
                requiredNeighbors:[TileType.Forest],
                produces: [ResourceType.Traps],
            }),
            new Tile(TileType.Blind,{
                requires: [ResourceType.Wood, ResourceType.Traps],
                placeOn: [TileType.Forest],
                produces: [ResourceType.Deer]
            }),
            new Tile(TileType.Windmill,{
                requiredNeighbors:[TileType.Grainery],
                requires: [ResourceType.Wheat,ResourceType.Fabric, ResourceType.Wood, ResourceType.Stone, ResourceType.Tools],
                produces: [ResourceType.Flour],
            }),
        ]

        this.levels = [
            new Level({
                label:"Build a windmill",
                objective:TileType.Windmill,
                resources: [ResourceType.Humans],
                cells: [
                    new TileToCell(2,0,TileType.Water),
                    new TileToCell(3,2,TileType.Water),
                    new TileToCell(2,3,TileType.Water),
                    new TileToCell(3,3,TileType.Water),
                    new TileToCell(3,0,TileType.Forest),
                    new TileToCell(0,3,TileType.Mountian)],
                size:4,
                exclude:[TileType.Barn,TileType.Blind]
            }),
        ]
    }
}

export const _Data = new Data();

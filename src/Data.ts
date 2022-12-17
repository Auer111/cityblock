
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
            new Tile(TileType.Grass),
            new Tile(TileType.Water),
            new Tile(TileType.Forest),
            new Tile(TileType.Mountian),
            
            new Tile(TileType.Camp,{
                autoUpgrades:[TileType.Lumbercamp,TileType.Quarry],
                requires: [ResourceType.Humans],
            }),
            new Tile(TileType.Lumbercamp,{
                requiredNeighbors:[TileType.Forest],
                produces: [ResourceType.Wood],
            }),
            new Tile(TileType.Quarry,{
                requiredNeighbors:[TileType.Mountian],
                requires: [ResourceType.Tools],
                produces: [ResourceType.Stone],
            }),
            new Tile(TileType.Shack,{
                requires: [ResourceType.Wood],
                produces: [ResourceType.Surf],
                autoUpgrades:[TileType.Shack_hunter, TileType.Shack_reaper],
            }),
            
            new Tile(TileType.Shack_reaper,{
                requiredNeighbors:[TileType.Fallow],
                produces: [ResourceType.Reaper,ResourceType.Surf],
                autoUpgrades:[TileType.Shack_reaper_wheat, TileType.Shack_reaper_flax],
            }),
            new Tile(TileType.Shack_reaper_wheat,{
                requiredNeighbors:[TileType.Wheat],
                produces: [ResourceType.Reaper,ResourceType.Surf],
            }),
            new Tile(TileType.Shack_reaper_flax,{
                requiredNeighbors:[TileType.Flax],
                produces: [ResourceType.Reaper,ResourceType.Surf],
            }),
            new Tile(TileType.Fallow,{
                requiredNeighborsAny:[TileType.Shack, TileType.Shack_reaper, TileType.Shack_reaper_wheat, TileType.Shack_reaper_flax],
                requiredNeighborsAnyDebug:[TileType.Shack],
                requires: [ResourceType.Surf],
                produces: [ResourceType.Reaper,ResourceType.Surf],
            }),
            new Tile(TileType.Wheat,{
                placeOn: [TileType.Fallow],
                requires: [ResourceType.Reaper],
                produces: [ResourceType.Wheat,ResourceType.Reaper,ResourceType.Surf],
            }),
            new Tile(TileType.Flax,{
                placeOn: [TileType.Fallow],
                requires: [ResourceType.Reaper],
                produces: [ResourceType.Flax,ResourceType.Reaper,ResourceType.Surf],
            }),
            new Tile(TileType.Blacksmith,{
                requires: [ResourceType.Wood,ResourceType.Surf],
                produces: [ResourceType.Tools],
            }),
            new Tile(TileType.Shack_hunter,{
                label:"Hunter's Shack",
                imgPath:"Shack.png",
                requiredNeighbors:[TileType.Forest],
                produces: [ResourceType.Traps],
            }),
            new Tile(TileType.Blind,{
                requires: [ResourceType.Wood, ResourceType.Traps],
                placeOn: [TileType.Forest],
                produces: [ResourceType.Deer]
            }),
            new Tile(TileType.Windmill,{
                requiredNeighbors:[TileType.Wheat],
                requires: [ResourceType.Wheat,ResourceType.Flax, ResourceType.Wood, ResourceType.Stone, ResourceType.Tools],
                produces: [ResourceType.Flour],
            }),
        ]

        this.levels = [
            new Level({
                label:"Build a windmill",
                objective:TileType.Windmill,
                resources: [ResourceType.Humans],
                cells: [
                    new TileToCell(2,0,TileType.Forest),
                    new TileToCell(0,2,TileType.Mountian)],
                size:3
            }),
        ]
    }
}

export const _Data = new Data();

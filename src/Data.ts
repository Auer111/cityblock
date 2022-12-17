
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
            }),
            new Tile(TileType.Lumbercamp,{
                requiredNeighbors:[TileType.Forest],
                produces: [ResourceType.Wood],
            }),
            new Tile(TileType.Quarry,{
                requiredNeighbors:[TileType.Mountian],
                produces: [ResourceType.Stone],
            }),
            new Tile(TileType.Shack,{
                requires: [ResourceType.Wood],
                produces: [ResourceType.Surf],
                autoUpgrades:[TileType.Shack_hunter, TileType.Shack_reaper],
            }),
            new Tile(TileType.Shack_reaper,{
                requiredNeighbors:[TileType.Wheat, TileType.Flax],
                requires: [ResourceType.Wood],
            }),
            new Tile(TileType.Fallow,{
                requires: [ResourceType.Surf],
            }),
            new Tile(TileType.Wheat,{
                requiredNeighbors:[TileType.Wheat],
                produces: [ResourceType.Wheat],
            }),
            new Tile(TileType.Flax,{
                requiredNeighbors:[TileType.Flax],
                produces: [ResourceType.Flax],
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
            new Tile(TileType.Windmill),
            new Tile(TileType.Blacksmith,{
                requires: [ResourceType.Wood, ResourceType.Stone],
                produces: [ResourceType.Tools],
            }),
            
        ]

        this.levels = [
            new Level({
                label:"Level 1",
                objective:Tile.one(13),
                deckTiles: [TileType.Camp],
                cells: [
                    new TileToCell(2,2,TileType.Forest),
                    new TileToCell(0,1,TileType.Mountian)],
                size:4
            }),
        ]
    }
}

export const _Data = new Data();

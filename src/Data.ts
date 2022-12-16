
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
            new Tile(TileType.Wheat),
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
                autoUpgrades:[TileType.HunterShack]
            }),
            new Tile(TileType.Blacksmith,{
                requires: [ResourceType.Wood, ResourceType.Stone],
                produces: [ResourceType.Tools],
            }),
            new Tile(TileType.HunterShack,{
                label:"Hunter's Shack",
                requires: [ResourceType.Wood],
                requiredNeighbors:[2],
            }),
            new Tile(TileType.Blind,{
                requires: [ResourceType.Wood],
                placeOn: [TileType.Forest],
                produces: [ResourceType.Deer]
            }),
            new Tile(TileType.Windmill),
            new Tile(TileType.Flax),
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

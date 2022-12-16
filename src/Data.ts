
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
            new Tile({
                type:TileType.Grass,
            }),
            new Tile({
                type:TileType.Camp,
                upgradeTypes:[TileType.Lumbercamp,TileType.Quarry],
            }),
            new Tile({
                type:TileType.Forest,
            }),
            new Tile({
                type:TileType.Lumbercamp,
                requiredNeighbors:[TileType.Forest],
                produces: [ResourceType.Wood],
            }),
            new Tile({
                type:TileType.Mountian,
            }),
            new Tile({
                type:TileType.Quarry,
                requiredNeighbors:[4],
            }),
            new Tile({
                type:TileType.Water,
            }),
            new Tile({
                type:TileType.Wheat,
            }),
            new Tile({
                type:TileType.Blacksmith,
            }),
            new Tile({
                type:TileType.Windmill,
            }),
            new Tile({
                type:TileType.Blind,
                placeOn: [2],
                produces: [ResourceType.Deer]
            }),
            new Tile({
                type:TileType.Shack,
                requires: [ResourceType.Wood],
            }),
            new Tile({
                type:TileType.Lodge,
                label:"Hunter's Lodge",
                requires: [ResourceType.Wood],
                requiredNeighbors:[2],
            }),
            new Tile({
                label:"Flax",
            }),
        ]

        this.levels = [
            new Level({
                label:"Level 1",
                objective:Tile.one(13),
                deckTiles: [TileType.Camp],
                cells: [new TileToCell(0,1,TileType.Forest)],
                size:3
            }),
        ]
    }
}

export const _Data = new Data();

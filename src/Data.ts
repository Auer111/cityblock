
import { Tile } from './Tile';
import{ Level }from './Level';
import { TileToCell } from './TileToCell';
import { Resource, TileResource } from './Resource';
export class Data
{
    tiles : Tile[];
    resources : Resource[];
    levels : Level[];
    constructor(){}

    seed(){

        this.resources = [
            new Resource({
                label:"Wood"
            }),
            new Resource({
                label:"Food"
            })
        ]

        this.tiles = [
            //0
            new Tile({
                label:"Grass",
            }),
            //1
            new Tile({
                label:"Camp",
                upgradeIds:[3,5],
            }),
            //2
            new Tile({
                label:"Forest",
            }),
            //3
            new Tile({
                label:"Lumbercamp",
                requiredNeighbors:[2],
                tileResources: [new TileResource(Resource.one(0),2)],
                handIds:[11,12]
            }),
            //4
            new Tile({
                label:"Mountian",
            }),
            //5
            new Tile({
                label:"Quarry",
                requiredNeighbors:[4],
            }),
            //6
            new Tile({
                label:"Water",
            }),
            //7
            new Tile({
                label:"Wheat",
            }),
            //8
            new Tile({
                label:"Blind",
            }),
            //9
            new Tile({
                label:"Blacksmith"
            }),
            //10
            new Tile({
                label:"Windmill"
            }),
            //11
            new Tile({
                label:"Blind",
                placeOn: [2],
                handIds:[12],
                tileResources: [new TileResource(Resource.one(0),-1), new TileResource(Resource.one(1),1)],
            }),
            //12
            new Tile({
                label:"Shack",
                tileResources: [new TileResource(Resource.one(0),-1),new TileResource(Resource.one(1),-1)],
                handIds:[7,13],
            }),
            //13
            new Tile({
                label:"Flax",
            }),
        ]

        this.tiles.forEach(t => t.hand = Tile.many(t.handIds));

        this.levels = [
            new Level({
                label:"Level 1",
                objective:Tile.one(13),
                deckTileIds: [1],
                cells: [new TileToCell(0,1,Tile.one(2))],
                size:5
            }),
        ]
    }
}

export const _Data = new Data();

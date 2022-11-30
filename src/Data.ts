
import { Tile } from './Tile.js';
import{ Level }from './Level.js';
export class Data{

    tiles : Tile[];
    levels : Level[];
    constructor(){
        this.seed();
    }

    seed(){
        this.tiles = [
            new Tile({
                label:"Grass",
                imgPath:"unity/Grass.png"
            }),
            new Tile({
                label:"Camp",
                imgPath:"unity/Camp.png"
            }),
            new Tile({
                label:"Forest",
                imgPath:"unit/Forest.png"
            }),
            new Tile({
                label:"Mountian",
                imgPath:"unity/Mountian.png"
            }),
            new Tile({
                label:"Water",
                imgPath:"unity/Water.png"
            }),
            new Tile({
                label:"Wheat",
                imgPath:"unity/Wheat.png"
            })
        ]

        this.levels = [
            new Level({
                id:0,
                label:"Welcome",
                hand:[this.tiles[2]],
                handUnlimited:[],
                locked:[this.tiles[1]],
                objective:this.tiles[1]

            })
        ]
    }
}

export const _Data = new Data();
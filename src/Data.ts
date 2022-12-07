
import { Tile } from './Tile';
import{ Level }from './Level';
import { Category } from './Category';
import { TileToCell } from './TileToCell';
export class Data{

    tiles : Tile[];
    categories:Category[];
    levels : Level[];
    constructor(){
    }

    seed(){
        this.tiles = [
            new Tile({
                label:"Grass",
                imgPath:"Grass.png",
                categoryId:0
            }),
            new Tile({
                label:"Camp",
                imgPath:"Camp.png",
                upgradeIds:[3,5],
                categoryId:2
            }),
            new Tile({
                label:"Forest",
                imgPath:"Forest.png",
                categoryId:2
            }),
            new Tile({
                label:"Lumbercamp",
                imgPath:"Lumbercamp.png",
                requiredNeighbors:[2],
                categoryId:2
            }),
            new Tile({
                label:"Mountian",
                imgPath:"Mountian.png",
                categoryId:2
            }),
            new Tile({
                label:"Quarry",
                imgPath:"Quarry.png",
                categoryId:2,
                requiredNeighbors:[4],
            }),
            new Tile({
                label:"Water",
                imgPath:"Water.png",
                categoryId:2
            }),
            new Tile({
                label:"Wheat",
                imgPath:"Wheat.png",
                categoryId:4
            })
        ]

        this.categories = [
            new Category({
                label:"",
                icon:"",
                color:""
            }),
            new Category({
                label:"Power",
                icon:"bolt-lightning",
                color:"brown"
            }),
            new Category({
                label:"Resource",
                icon:"tree",
                color:"green"
            }),
            new Category({
                label:"Housing",
                icon:"house",
                color:"blue"
            }),
            new Category({
                label:"Food",
                icon:"burger",
                color:"red"
            })
        ]

        this.levels = [
            new Level({
                label:"Level 1",
                objective:Tile.find(3),
                cells: [new TileToCell(0,1,Tile.find(2))],
                size:2
            }),
            new Level({
                label:"Level 2",
                objective:Tile.find(3),
                cells: [new TileToCell(0,1,Tile.find(4))],
                size:2
            })
        ]
    }
}

export const _Data = new Data();


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
            //0
            new Tile({
                label:"Grass",
                categoryId:0
            }),
            //1
            new Tile({
                label:"Camp",
                upgradeIds:[3,5],
                categoryId:2
            }),
            //2
            new Tile({
                label:"Forest",
                categoryId:2
            }),
            //3
            new Tile({
                label:"Lumbercamp",
                requiredNeighbors:[2],
                categoryId:2
            }),
            //4
            new Tile({
                label:"Mountian",
                categoryId:2
            }),
            //5
            new Tile({
                label:"Quarry",
                categoryId:2,
                requiredNeighbors:[4],
            }),
            //6
            new Tile({
                label:"Water",
                categoryId:2
            }),
            //7
            new Tile({
                label:"Wheat",
                categoryId:4
            }),
            //8
            new Tile({
                label:"Blind",
                categoryId:4
            }),
            //9
            new Tile({
                label:"Blacksmith",
                categoryId:4
            }),
            //10
            new Tile({
                label:"Windmill",
                categoryId:4
            }),
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
                hand: Tile.select([1]),
                cells: [new TileToCell(0,1,Tile.find(2))],
                size:2
            }),
            new Level({
                label:"Level 2",
                objective:Tile.find(5),
                hand: Tile.select([1]),
                cells: [new TileToCell(1,1,Tile.find(4))],
                size:2
            }),
            new Level({
                label:"Level 3",
                objective:Tile.find(5),
                hand: Tile.select([1]),
                cells: [
                    new TileToCell(0,1,Tile.find(2)),
                    new TileToCell(1,1,Tile.find(4))
                ],
                size:2
            })
        ]
    }
}

export const _Data = new Data();


import { Tile } from './Tile';
import{ Level }from './Level';
import { Category } from './Category';
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
                imgPath:"unity/Grass.png",
                categoryId:0
            }),
            new Tile({
                label:"Camp",
                imgPath:"unity/Camp.png",
                categoryId:2
            }),
            new Tile({
                label:"Forest",
                imgPath:"unity/Forest.png",
                categoryId:2
            }),
            new Tile({
                label:"Mountian",
                imgPath:"unity/Mountian.png",
                categoryId:2
            }),
            new Tile({
                label:"Water",
                imgPath:"unity/Water.png",
                categoryId:2
            }),
            new Tile({
                label:"Wheat",
                imgPath:"unity/Wheat.png",
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
                label:"Camp",
                hand:Tile.select([1]),
                handUnlimited:[],
                locked:[],
                objective:this.tiles[1],
                size:2
            }),
            new Level({
                label:"Lumber",
                hand:Tile.select([2]),
                handUnlimited:[],
                locked:Tile.select([1]),
                objective:Tile.find(1),
                size:2
            })
        ]
    }
}

export const _Data = new Data();

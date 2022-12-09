import Utils from "../modules/Utils";
import { _Campaign } from "./Campaign";
import { Category } from "./Category";
import { _Data } from "./Data";
import './extensions'

let _tileIterator = 0;
export class Tile
{
    public id: number = _tileIterator++;
    public label:string;
    public imgPath: string;
    public locked:boolean;
    public categoryId:number;
    public category:Category;
    public upgradeIds: number[] = [];
    public placeOn: number[] = [0];
    public requiredNeighbors:number[] = [];
    public constructor(init?:Partial<Tile>) {
        Object.assign(this, init);
        this.imgPath = `./img/${this.imgPath ?? (this.label+'.png')}`;
    }

    static find(id:number):Tile
    {
        return _Data.tiles.find(x => x.id == id);
    }
    static select(ids:number[]):Tile[]
    {
        return ids.map(i=> Tile.find(i));
    }

    canPlace(tileId:number):boolean{
        return this.placeOn.find(t => t === tileId) !== undefined;
    }

    card() : HTMLElement 
    {
        this.category = this.category ?? _Data.categories[this.categoryId];

        if(this.locked){
            return `
            <figure id="quest-${this.id}" class="quest card card--${this.category.color}">
            <img src="${this.imgPath}" />
                <div class="triangle"></div>
                <figcaption class="card__caption">
                    <div class="card__image-container">
                        <h3 class="card__type">${this.category.label}</h3>
                    </div>
                    <h1 class="card__name">${this.label}</h1>
                    <div class="lock">
                    <i class="fa-sharp fa-solid fa-lock"></i>
                    </div>
                    
                </figcaption>
            </figure> `
            .ToEl()
        }
        
        return `<figure id="${this.id}" class="card drag">
                    <div class="label bg">${this.label}</div>
                    <div class="label">${this.label}</div>
                    <end>
                        <img src="${this.imgPath}" />
                    </end>
            </figure>`
        .ToEl();
    };

    wrappedImg() : HTMLElement
    {
       return `
       <div class="img-wrapper">
            <img class="img ${this.label?.toLowerCase()}-animation" src="${this.imgPath}" />
        </div>`.ToEl();
    }

    loadCategory(){
        this.category = Category.find(this.categoryId);
    }
}


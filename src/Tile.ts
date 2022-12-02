import Utils from "../modules/Utils";
import { _Campaign } from "./Campaign";
import { Category } from "./Category";
import { _Data } from "./Data";
import './extensions'

export class Tile
{
    public id: number = _tileIterator++;
    public label:string;
    public imgPath: string;
    public locked:boolean;
    public categoryId:number;
    public category:Category;
    public constructor(init?:Partial<Tile>) {
        Object.assign(this, init);
        this.imgPath = `./img/${this.imgPath}`;
        
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
        
        return `<figure id="${this.id}" class="card drag card--${this.category.color}">
                <img src="${this.imgPath}" />
                <div class="triangle"></div>
                ${_Campaign.level.getCountHtml(this)}
                <figcaption class="card__caption">
                    <h3 class="card__type">${this.category.label}</h3>
                    <h1 class="card__name">${this.label}</h1>
                    <div class="grid-wrapper">
                        
                    </div>
                </figcaption>
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
}

export let _tileIterator = 0;
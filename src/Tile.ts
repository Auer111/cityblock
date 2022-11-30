import { _Campaign } from "./Campaign";
import { Level } from "./Level";

export class Tile
{
    public id: number;
    public label:string;
    public imgPath: string;
    public img:HTMLElement|null = null;
    public locked:boolean;
    public constructor(init?:Partial<Tile>) {
        Object.assign(this, init);
        this.setImg();
    }

    card() : HTMLElement {

        if(this.locked){
            return `
            <figure id="quest-${this.id}" class="quest card card--${"cat color"}">
                ${this.img}
                <div class="triangle"></div>
                <figcaption class="card__caption">
                    <div class="card__image-container">
                        <h3 class="card__type">${"cat name"}</h3>
                    </div>
                    <h1 class="card__name">${this.label}</h1>
                    <div class="lock">
                    <i class="fa-sharp fa-solid fa-lock"></i>
                    </div>
                    
                </figcaption>
            </figure> `
            .ToEl()
        }
        
        return `<figure id="${this.id}" class="card drag card--${"cat.color"}">
                ${this.img}
                <div class="triangle"></div>
                ${"this.getCountText(tile)"}
                <figcaption class="card__caption">
                    <h3 class="card__type">${"cat.name"}</h3>
                    <h1 class="card__name">${this.label}</h1>
                    <div class="grid-wrapper">
                        ${_Campaign.level.getCountHtml(this)}
                    </div>
                </figcaption>
            </figure>`
        .ToEl();
    }

    setImg(){
        this.img = `
        <div class="img-wrapper">
            <img class="img ${this.label?.toLowerCase()}-animation" src="./img/${this.img}" />
        </div>`
        .ToEl();
    }
}
import { _Campaign } from "./Campaign";
import { _Data } from "./Data";

let _resourceIterator = 0;
export class Resource
{
    id:number = _resourceIterator++;
    label:string;
    amount:number = 0;
    public constructor(init?:Partial<Resource>) {
        Object.assign(this, init);
    }

    static one(id:number):Resource
    {
        return _Data.resources.find(x => x.id == id);
    }
    static many(ids:number[]):Resource[]
    {
        return ids.map(i=> Resource.one(i));
    }

    render():HTMLElement{
        return `<div class="resource col">${this.label}:${this.getValue()}</div>`.ToEl();
    }

    getValue():number{
        let value = _Campaign.grid?.cells?.reduce((allTotal, cell) => {
            const cellSum = cell?.tile?.tileResources.reduce((total, tileResource) => {
                return tileResource.Resource.id == this.id
                ? total + tileResource.Modifier
                : total;
            }, 0);
            return allTotal + cellSum;
          }, 0);

          return value === undefined ? 0: value;
    }

}

export class TileResource
{
    Resource:Resource;
    Modifier:number;
    constructor(resource:Resource, modifier:number){
        this.Resource = resource;
        this.Modifier = modifier;
    }
}
import { _Data } from "./Data";

let _categoryIterator = 0;
export class Category
{
    public id: number = _categoryIterator++;
    public label:string;
    public icon:string;
    public color:string;

    public constructor(init?:Partial<Category>) {
        Object.assign(this, init);
    }

    static find(id:number):Category
    {
        return _Data.categories.find(x => x.id == id);
    }
}
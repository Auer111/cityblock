export class Tile
{
    public id: number;
    public label:string;
    public imgPath: string;
    public img:HTMLElement|null = null;
    public constructor(init?:Partial<Tile>) {
        Object.assign(this, init);
    }
}
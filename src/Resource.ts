import { _Data } from "./Data";

export enum ResourceType
{
    Shelter,
    Wood,
    Fish,
    Brick,
    Stone,
    Tools,
    Deer,
}

export class Resource
{
    public static src(type:ResourceType):string{
        return `./img/resources/${ResourceType[type]}.png}`;
    }
    public static img(type:ResourceType):string{
        return `<img src="${Resource.src(type)}"/>`;
    }
}

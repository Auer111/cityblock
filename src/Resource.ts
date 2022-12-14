import { _Data } from "./Data";

export enum ResourceType
{
    Locked,
    Humans,
    Serf,
    Reaper,
    Shelter,
    Wood,
    Fish,
    Brick,
    Stone,
    Tools,
    Deer,
    Traps,
    Wheat,
    Flax,
    Flour,
    Fabric,
}

export class Resource
{
    public static label(type:ResourceType):string{
        return ResourceType[type];
    }
    public static src(type:ResourceType):string{
        return `./img/resources/${ResourceType[type]}.png`;
    }
    public static img(type:ResourceType):string{
        return `<img class="resource" src="${Resource.src(type)}"/>`;
    }
}

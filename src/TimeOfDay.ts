import { _Campaign } from "./Campaign"
import Cell from "./cell";
import { Tile, TileType } from "./Tile";

export enum TimesOfDay{
    Day,
    Night,
}

export class TimeOfDay
{
    time : TimesOfDay = TimesOfDay.Day;
    constructor(){}

    SetTimeOfDay(timeOfDay: TimesOfDay){
        this.time = timeOfDay;
    }
}

export const _TimeOfDay = new TimeOfDay();
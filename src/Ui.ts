import interact from 'interactjs'
import { InteractEvent } from "@interactjs/types";
import { _Campaign } from './Campaign';
import { _Data } from './Data';
import { Cell } from './cell';
import { _Menu } from './Menu';
import { Tile, TileType } from './Tile';

export class UI
{
    cardsEl : HTMLElement;
    placementOverlay : HTMLElement;
    placementCellId : number;
    mousePos : number[];
    constructor(){
        this.mousePos = [0,0];
        this.awake();
    }

    awake(){
        document.addEventListener("mousemove",(event)=>{
            _UI.mousePos = [event.clientX,event.clientY];
        });
        document.addEventListener("touchmove",(event)=>{
            _UI.mousePos = [event.touches[0].clientX,event.touches[0].clientY];
        });
    }

    onLevelStart(){
        this.cardsEl = window.document.getElementById("cards");
        this.placementOverlay = document.body.querySelector("#can-place-overlay");
        this.placementCellId = null;

        this.render(Tile.one(_Campaign.level.deckTiles[0]));
        interact('.card.drag').draggable({
            listeners: {
                start (event:InteractEvent) {
                    const card = event.target;
                    card.classList.add('dragging');
                    _Campaign.grid.setValidityForAllCells(null,Tile.one(Number(card.id)));
                    document.querySelectorAll('.cell').forEach(el => el.classList.remove('hover'));
                },
                move (event:InteractEvent) {
                    const card = event.target;
                    const cell = _UI.getCellAtMouse();
                    document.querySelectorAll('.cell').forEach(el => el.classList.remove('hover'));
                    if(!cell){
                        _UI.placementCellId = null;
                        _UI.setCanPlaceOverlay(cell, null);
                    }
                    else{
                        cell.el.classList.add('hover');
                        _UI.setCanPlaceOverlay(cell, Number(card.id));
                    }
                },
                end (event:InteractEvent)
                {
                    const card = event.target;
                    card.classList.remove('dragging');
                    const cell = _UI.getCellAtMouse();
                    _UI.setCanPlaceOverlay(null, null);
                    if(_UI.placeTile(cell, Number(card.id))){
                        _UI.render(cell.tile);
                        cell.el.classList.remove('hover');
                    }
                    _Campaign.grid.setValidityForAllCells(true, null);
                }
            }
        });
    }

    render(tile:Tile){
        this.cardsEl.innerHTML = "";
        if(_Campaign.level.complete()){
            this.cardsEl.innerHTML = "";
            this.cardsEl.appendChild(_Menu.Next.el);
            return;
        }
        const tilesForResource = _Data.tiles.filter(t => t.requires.includes(tile.produces[0]));
        (tilesForResource.length === 0 
            ? Tile.many(_Campaign.level.deckTiles) 
            : tilesForResource)
            .forEach(t => this.cardsEl.appendChild(t.card()));
    }
    
    placeTile(cell:Cell, type:TileType){
        if(!_Campaign.grid || !cell || !type){return false;}
        if(cell.el.classList.contains("valid")){
            cell.placeTile(type);
            return true;
        }
        return false;
    }

    setCanPlaceOverlay(cell:Cell, type:TileType){ 
        if(!_Campaign.grid || !cell || !type){
            this.placementOverlay.style.display = 'none';
            return;
        }

        //if did not change cell
        if(cell.id === this.placementCellId){return;}
        //hovered over a new cell
        this.placementOverlay.style.display = 'grid';
        this.placementOverlay.querySelector("img").src = Tile.one(type).imgPath;
        cell.el.appendChild(this.placementOverlay);
        this.placementCellId = cell.id;
    }

    getCellAtMouse(){
        var cellXY = this.screen2Iso(this.mousePos);
        return _Campaign.grid.cells.find(cell => cell.x == cellXY[0] && cell.y == cellXY[1]);
    }

    screen2Iso(screen : number[]) {
        var offY = 20;
        var theta = 30.5;
        var c = Math.cos(theta/2);
        var s = Math.sin(theta/2);
        var rect = document.querySelector(".grid-left").getBoundingClientRect();
        var origin = [rect.left + (rect.width/2), offY + rect.bottom - (rect.width/2)]; //the pixel coordinates of (0, 0)
        var unit = rect.width + 10; //+padding
        var isoX = ((screen[0] - origin[0]) / c - (screen[1] - origin[1]) / s) / unit;
        var isoY = ((screen[0] - origin[0]) / c + (screen[1] - origin[1]) / s) / unit;
        var cell = [_Campaign.grid.rows - 1 - Math.round(isoX) * -1, Math.round(isoY) * -1];
        return  cell;
    }
}

export const _UI = new UI();
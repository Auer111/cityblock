import interact from 'interactjs'
import { InteractEvent } from "@interactjs/types";
import { _Campaign } from './Campaign';
import { _Data } from './Data';
import { Cell } from './cell';

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

        this.renderHand();
        interact('.card.drag').draggable({
            listeners: {
                start (event:InteractEvent) {
                    const card = event.target;
                    card.classList.add('dragging');
                    _Campaign.grid.SetGridValidity(null,_Data.tiles.find(x => x.id == Number(card.id)));
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
                        _Campaign.level.removeCard(Number(card.id));
                        cell.el.classList.remove('hover');
                    }
                    _Campaign.grid.SetGridValidity(true, null);
                }
            }
        });
        
    }

    renderHand(){
        const level = _Campaign.level;
        // if(window.QUEST.levelComplete){
        //     this.cardsEl.innerHTML = window.MENU.Next.html();
        //     return;
        // }
        const handStacked =  [...new Set(level.getHand())];
        this.cardsEl.innerHTML = "";
        handStacked.forEach(t => this.cardsEl.appendChild(t.card()));
    }
    
    placeTile(cell:Cell, tileId: number){
        if(!_Campaign.grid || !cell || !tileId){return false;}
        
        cell.setTile(_Data.tile(tileId));
        if(cell.el.classList.contains("valid")){
            
            //window.QUEST.placed(tileId);
            return true;
        }
        return false;
    }


    // getCardCell(tile, index){
    //     let tId = null;
    //     let selectedTile = null;
    //     switch(index){
    //         case 0: tId = null; break;
    //         case 1: tId = tile.validAll[2]; break;
    //         case 2: tId = null; break;
    //         case 3: tId = tile.validAll[3]; break;
    //         case 4: tId = tile.validAll[0]; break;
    //         case 5: tId = tile.validAll[1]; break;
    //         case 6: tId = null; break;
    //         case 7: tId = tile.validAll[4]; break;
    //         case 8: tId = null; break;
    //     }
    //     if(tId && tId != -1){selectedTile = this.data.tiles.find(x => x.id == tId);}
    //     return { 
    //         gridId: index, 
    //         tileId: tId, 
    //         overlay: index == 4 ? `<i class="fa-solid fa-down-long"></i>` : null
    //     };
    // }

    setCanPlaceOverlay(cell:Cell, tileId: number){ 
        
        if(!_Campaign.grid || !cell || !tileId){
            this.placementOverlay.style.display = 'none';
            return;
        }

        //did not change cell
        if(cell.id === this.placementCellId){
            return;
        }

        this.placementOverlay.style.display = 'grid';
        this.placementOverlay.querySelector("img").src = _Data.tile(tileId).imgPath;
        cell.el.appendChild(this.placementOverlay);
        this.placementCellId = cell.id;
    }

    getCellAtMouse(){
        var cellXY = this.screen2Iso(this.mousePos);
        return _Campaign.grid.cells.find(cell => cell.x == cellXY[0] && cell.y == cellXY[1]);
    }

    screen2Iso(screen : number[]) {
        var theta = 30.5;
        var c = Math.cos(theta/2);
        var s = Math.sin(theta/2);
        var rect = document.querySelector(".grid-left").getBoundingClientRect();
        var origin = [rect.left + (rect.width/2), rect.bottom - (rect.width/2)]; //the pixel coordinates of (0, 0)
        var unit = rect.width + 10; //+padding
        var isoX = ((screen[0] - origin[0]) / c - (screen[1] - origin[1]) / s) / unit;
        var isoY = ((screen[0] - origin[0]) / c + (screen[1] - origin[1]) / s) / unit;
        var cell = [_Campaign.grid.rows - 1 - Math.round(isoX) * -1, Math.round(isoY) * -1];
        return  cell;
    }
}

export const _UI = new UI();
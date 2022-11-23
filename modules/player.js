export class Player{
    constructor(data){
        window.PLAYER = this;

        this.unlimited = [data.tiles[1],data.tiles[2],data.tiles[3]];
        this.hand = [];
    }

    getHand(){
        return [...this.unlimited, ...this.hand]
    }

    getHandTileCount(tile){
        return this.unlimited.includes(tile) ? -1 : this.hand.filter(t => t.id == tile.id).length;
    }

    addCard(tileId){
        if(this.unlimited.find(u => u.tileId == tileId) === undefined){
            this.hand = [...this.hand, data.tiles.find(x => x.id == tileId)];
        }
        window.UI.renderHand();
    }

    removeCard(tileId){
        if(this.unlimited.find(u => u.tileId == tileId) === undefined){
            const remove = this.hand.findIndex(x => x.id == tileId);
            if(remove > -1){
                this.hand.splice(remove,1);
            }
        }

        window.UI.renderHand();
    }
}
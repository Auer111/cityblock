export class Player{
    constructor(data){
        window.PLAYER = this;
        this.data = data;
        this.unlimited = [];
        this.hand = [];
        this.loadData();
    }

    loadData(){
        const level = this.data.levels[this.data.currentLevel];
        if(level.handUnlimited.length > 0){
            this.unlimited = level.handUnlimited.map(tileId => this.data.tiles.find(t=>t.id === tileId));
        }
        if(level.hand.length > 0){
            this.hand = level.hand.map(tileId => this.data.tiles.find(t=>t.id === tileId));
        }
    }

    getHand(){
        return [...this.unlimited, ...this.hand];
    }

    getHandTileCount(tile){
        return this.unlimited.includes(tile) ? -1 : this.hand.filter(t => t.id == tile.id).length;
    }

    addCard(tileId){
        if(this.unlimited.find(u => u.tileId == tileId) === undefined){
            this.hand = [...this.hand, this.data.tiles.find(x => x.id == tileId)];
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

export default Player;
export class Player{
    constructor(data){
        window.PLAYER = this;

        this.hand = [data.tiles[1],data.tiles[2],data.tiles[2],data.tiles[2],data.tiles[3]];
    }

    addCard(tileId){
        this.hand = [...this.hand, data.tiles.find(x => x.id == tileId)];
        window.UI.renderHand();
    }

    removeCard(tileId){
        const remove = this.hand.findIndex(x => x.id == tileId);
        this.hand.splice(remove,1);
        window.UI.renderHand();
    }
}
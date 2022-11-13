export class Player{
    constructor(data){
        window.PLAYER = this;

        this.hand = [data.tiles[2]];
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
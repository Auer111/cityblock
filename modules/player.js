export class Player{
    constructor(data){
        window.PLAYER = this;

        this.hand = [data.tiles[1],data.tiles[1],data.tiles[2],data.tiles[2]];
    }

    addCard(tileId){
        this.hand = [...this.hand, data.tiles.find(x => x.id == tileId)];
        window.UI.renderHand();
    }

    removeCard(tileId){
        console.log("before remove",this.hand);
        const remove = this.hand.findIndex(x => x.id == tileId);
        this.hand.splice(remove,1);
        console.log("aftr remove",remove,this.hand);
        window.UI.renderHand();
    }

    

}
class Data{
    constructor(){
        window.DATA = this;
        this.data = null;
    }

    init(callback){
        window.UTILS.getJson("data.json", (data) => {
            data.tiles.forEach(tData => {
                tData.validAny = tData.validAny.filter(t => t > 0);
            });
            data.levels.forEach(level => {
                level.hand = level.hand.filter(t => t > 0);
                level.handUnlimited = level.handUnlimited.filter(t => t > 0);
            });
            this.data = data;
            callback();
        });
    }
}
export default Data;
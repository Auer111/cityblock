import Utils from "../Utils.js"

export class Img {
    
    constructor(){
        new Utils().loadCss(import.meta.url);
        window.IMG = this;

        this.Blank = 'blank.png';
        this.Tile = 'tile.png';
    }

    url(name){
        return `./modules/img/${name}`;
    }

    raw(img){
        return `<img src="./modules/img/${img}" />`;
    }
    render(img, name){
        img = img ?? this.Blank;
        
        let el = document.createElement('div');
        el.style.backgroundImage = `url('./modules/img/${img}')`;
        el.classList = `img ${name?.toLowerCase()}-animation`;

        let wrapper = document.createElement('div');
        wrapper.classList = "img-wrapper"
        wrapper.prepend(el);
        return wrapper;
    }
    
}

export default Img;
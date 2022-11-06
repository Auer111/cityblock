import Utils from "/modules/Utils.js"

export class Img {
    
    constructor(){
        new Utils().loadCss(import.meta.url);

        this.Blank = 'blank.png';
        this.Tile = 'tile.png';
    }

    url(name){
        return `/modules/img/${name}`;
    }

    render(img, name){
        img = img ?? this.Blank;
        
        let el = document.createElement('div');
        el.style.backgroundImage = `url('/modules/img/${img}')`;
        el.classList = `img ${name?.toLowerCase()}-animation`;

        let wrapper = document.createElement('div');
        wrapper.classList = "img-wrapper"
        wrapper.prepend(el);
        return wrapper;
    }
    
}

export default Img;
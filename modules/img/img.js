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

    render(name, animation){
        name = name ?? this.Blank;
        
        let img = document.createElement('div');
        img.style.backgroundImage = `url('/modules/img/${name}')`;
        img.classList = "img " + animation;

        let wrapper = document.createElement('div');
        wrapper.classList = "img-wrapper"
        wrapper.prepend(img);
        return wrapper;
    }
    
}

export default Img;
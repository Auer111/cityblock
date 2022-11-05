export class Img {
    
    constructor(){
        this.Blank = 'blank.png';
        this.Tile = 'tile.png';
        this.Calendar = 'calendar.png';
    }

    url(name){
        return `/modules/img/${name}`;
    }

    render(name){
        name = name ?? this.Blank;
        let img = document.createElement('img');
        img.src = `/modules/img/${name}`;
        return img;
    }
    
}

export default Img;
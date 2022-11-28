export class Cell
{
    el : HTMLElement;
    x : number | undefined;
    y : number | undefined;


    constructor(){
        this.el = this.render();
    }

    render() : HTMLElement 
    {

        return document.createElement('div');
    }

}
export default Cell;
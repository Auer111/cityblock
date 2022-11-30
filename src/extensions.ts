export {}

declare global {
    interface String {
        ToEl() : HTMLElement;
    }
    interface HTMLElement{
        New(): HTMLElement;
    }
}

String.prototype.ToEl = function (this : string) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this;
    return wrapper.firstElementChild as HTMLElement;
};

HTMLElement.prototype.New = function(this:HTMLElement){
    return Object.assign({},this);
}

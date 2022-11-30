export {}

String.prototype.ToEl = function (this : string) {
    return new DOMParser().parseFromString(this, "text/html").firstElementChild as HTMLElement;
};

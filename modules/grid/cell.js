"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
class Cell {
    constructor() {
        this.el = this.render();
    }
    render() {
        return document.createElement('div');
    }
}
exports.Cell = Cell;
exports.default = Cell;

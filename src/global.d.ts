export {};

declare global {
    interface String {
        ToEl() : HTMLElement;
    }
}
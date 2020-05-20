import IOptions from "../model/IOptions";

interface IViewElement {
    element: HTMLElement;

    buildHtml(...args: any[]): HTMLElement;
}

export default IViewElement;

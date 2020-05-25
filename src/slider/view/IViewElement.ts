interface IViewElement {
  getElement(): HTMLElement;
  buildHtml(isVertical: boolean, ...args: any[]): HTMLElement;
}

export default IViewElement;

interface IViewElement {
  element: HTMLElement;

  buildHtml(isVertical: boolean, ...args: any[]): HTMLElement;
}

export default IViewElement;

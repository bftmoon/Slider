interface ViewElement {
  getElement(): HTMLElement;
  buildHtml(isVertical: boolean, ...args: any[]): HTMLElement;
}

export default ViewElement;

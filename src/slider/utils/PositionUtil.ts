class PositionUtil {
  static calc(isVertical: boolean, element: HTMLElement, event: MouseEvent) {
    if (element === event.target) {
      return isVertical
        ? 1 - event.offsetY / (event.target as HTMLElement).offsetHeight
        : event.offsetX / (event.target as HTMLElement).offsetWidth;
    }
    return PositionUtil.calcForOwner(isVertical, element, event);
  }

  private static calcForOwner(
    isVertical: boolean,
    element: HTMLElement,
    event: MouseEvent
  ) {
    const { left, top, width, height } = element.getBoundingClientRect();
    return isVertical
      ? 1 - (event.clientY - top) / height
      : (event.clientX - left) / width;
  }
}

export default PositionUtil;

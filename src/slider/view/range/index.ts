import MinMax from 'types/MinMax';
import ClassNames from 'utils/ClassNames';
import CssClassUtil from 'utils/CssClassUtil';

class Range {
  private element: HTMLDivElement;

  buildHtml(isVertical: boolean) {
    this.element = document.createElement('div');
    CssClassUtil.initClass(this.element, isVertical, ClassNames.Range);
    return this.element;
  }

  getElement() {
    return this.element;
  }

  updatePosition(
    isVertical: boolean,
    percent: MinMax<number>,
    height?: number,
  ) {
    if (isVertical) {
      const heightPart = height / 100;
      if (percent.min !== undefined) this.element.style.marginBottom = `${heightPart * percent.min}px`;
      if (percent.max !== undefined) this.element.style.marginTop = `${heightPart * (100 - percent.max)}px`;
    } else {
      if (percent.min !== undefined) this.element.style.marginLeft = `${percent.min}%`;
      if (percent.max !== undefined) this.element.style.marginRight = `${100 - percent.max}%`;
    }
  }

  toggleOrientation() {
    this.element.removeAttribute('style');
  }
}

export default Range;

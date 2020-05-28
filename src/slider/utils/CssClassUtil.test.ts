import IViewElement from '../IViewElement';
import CssClassUtil from './CssClassUtil';

describe('Css class selection and update by js class', () => {
  class MockViewElement implements IViewElement {
    private element: HTMLElement = document.createElement('div');

    buildHtml(isVertical: boolean, ...args: any[]): HTMLElement {
      return undefined;
    }

    getElement(): HTMLElement {
      return this.element;
    }
  }

  test('Class by name and orientation added', () => {
    let mock = new MockViewElement();
    CssClassUtil.initClass(mock, true);
    expect(mock.getElement().classList.toString()).toBe(`${CssClassUtil.MAIN_PREFIX}__mockviewelement ${CssClassUtil.MAIN_PREFIX}__mockviewelement_vertical`);

    mock = new MockViewElement();
    CssClassUtil.initClass(mock, false);
    expect(mock.getElement().classList.toString()).toBe(`${CssClassUtil.MAIN_PREFIX}__mockviewelement ${CssClassUtil.MAIN_PREFIX}__mockviewelement_horizontal`);
  });

  test('Class update by toggle hidden', () => {
    const mock = new MockViewElement();

    CssClassUtil.toggleHidden(mock);
    expect(mock.getElement().classList.contains(`${CssClassUtil.MAIN_PREFIX}__mockviewelement_hidden`)).toBeTruthy();
    CssClassUtil.toggleHidden(mock);
    expect(mock.getElement().classList.contains(`${CssClassUtil.MAIN_PREFIX}__mockviewelement_hidden`)).toBeFalsy();
  });

  test('Class update by toggle orientation', () => {
    const mock = new MockViewElement();
    CssClassUtil.initClass(mock, true);

    CssClassUtil.toggleOrientation(mock);
    expect(mock.getElement().classList.toString()).toBe(`${CssClassUtil.MAIN_PREFIX}__mockviewelement ${CssClassUtil.MAIN_PREFIX}__mockviewelement_horizontal`);
    CssClassUtil.toggleOrientation(mock);
    expect(mock.getElement().classList.toString()).toBe(`${CssClassUtil.MAIN_PREFIX}__mockviewelement ${CssClassUtil.MAIN_PREFIX}__mockviewelement_vertical`);
  });
});

describe('Css class selection and update by name', () => {
  test('Class and orientation adding and toggle', () => {
    let div = document.createElement('div');
    CssClassUtil.initHtmlClass(div, true, 'name');
    expect(div.classList.toString()).toBe(`${CssClassUtil.MAIN_PREFIX}__name ${CssClassUtil.MAIN_PREFIX}__name_vertical`);

    div = document.createElement('div');
    CssClassUtil.initHtmlClass(div, false, 'name');
    expect(div.classList.toString()).toBe(`${CssClassUtil.MAIN_PREFIX}__name ${CssClassUtil.MAIN_PREFIX}__name_horizontal`);
  });

  test('Class orientation toggle', () => {
    const div = document.createElement('div');
    CssClassUtil.initHtmlClass(div, true, 'name');

    CssClassUtil.toggleHtmlOrientation(div, 'name');
    expect(div.classList.toString()).toBe(`${CssClassUtil.MAIN_PREFIX}__name ${CssClassUtil.MAIN_PREFIX}__name_horizontal`);
    CssClassUtil.toggleHtmlOrientation(div, 'name');
    expect(div.classList.toString()).toBe(`${CssClassUtil.MAIN_PREFIX}__name ${CssClassUtil.MAIN_PREFIX}__name_vertical`);
  });

  test('Class init and update for root', () => {
    const rootDiv = document.createElement('div');
    CssClassUtil.initHtmlClass(rootDiv, true);
    expect(rootDiv.classList.toString()).toBe(`${CssClassUtil.MAIN_PREFIX} ${CssClassUtil.MAIN_PREFIX}_vertical`);

    CssClassUtil.toggleHtmlOrientation(rootDiv);
    expect(rootDiv.classList.toString()).toBe(`${CssClassUtil.MAIN_PREFIX} ${CssClassUtil.MAIN_PREFIX}_horizontal`);
  });
});

import Tooltip from "./Tooltip";
import CssClassUtil from "../utils/CssClassUtil";

describe('Tooltip class', () => {
  let tooltip: Tooltip;
  beforeEach(() => {
    tooltip = new Tooltip();
  })

  test('buildHtml return prepared element', () => {
    const spy = jest.spyOn(CssClassUtil, 'initClass')
    const html = tooltip.buildHtml(true);
    expect(spy).toBeCalledTimes(1);
    expect(html).toBeDefined();
  });

  describe('functions for built html', () => {
    beforeEach(() => {
      tooltip.buildHtml(false);
    });

    test('toggleHidden call hidden changes', () => {
      const spy = jest.spyOn(CssClassUtil, 'toggleHidden');
      tooltip.toggleHidden();
      expect(spy).toBeCalledTimes(1);
    });

    test('toggleOrientation call orientation changes', () => {
      const spy = jest.spyOn(CssClassUtil, 'toggleOrientation');
      tooltip.toggleOrientation();
      expect(spy).toBeCalledTimes(1);
    });

    test('getElement', () => {
      expect(tooltip.getElement()).toBeDefined();
    });

    describe('update', () => {
      beforeAll(()=>{
        // todo: global
        Object.defineProperty(
          document.documentElement,
          'offsetWidth',
          {value: 10}
        );
      })
      test('set text to html', () => {
        tooltip.update('text', true);
        expect(tooltip.getElement().innerText).toBe('text');
      });

      test('add left position when tooltip get out window on left', () => {
        // @ts-ignore
        tooltip.getElement().getBoundingClientRect = () => {
          return {left: -20};
        }
        tooltip.update(0, false);
        expect(tooltip.getElement().style.left).toBe('0px');
      });

      test('add right position when tooltip get out window on right', () => {
        // @ts-ignore
        tooltip.getElement().getBoundingClientRect =() => {
          return {right: 20};
        }
        tooltip.update(0, false);
        expect(tooltip.getElement().style.right).toBe('0px');
      });

      test('clean position when tooltip in window', () => {
        tooltip.getElement().style.left = '0';
        // @ts-ignore
        tooltip.getElement().getBoundingClientRect = () => {
          return {left: 1, right: 9};
        }
        tooltip.update(0, false);
        expect(tooltip.getElement().style.left).toBe('');
        expect(tooltip.getElement().style.right).toBe('');
      });
    });
  });
})

import DefaultView from './DefaultView';
import CssClassUtil from '../utils/CssClassUtil';
import Body from './body/Body';
import Scale from './scale/Scale';
import Observer from '../observer/Observer';
import ViewOptions from '../common/ViewOptions';

jest.mock('./scale/Scale');

describe('DefaultView class', () => {
  let view: DefaultView;
  beforeEach(() => {
    view = new DefaultView();
  });
  describe('render', () => {
    let html: HTMLElement;
    let boolOptions: ViewOptions;
    const points = {
      max: { percent: 20, tooltip: 30 },
      min: { percent: 10, tooltip: 20 },
    };
    beforeEach(() => {
      html = document.createElement('div');
      boolOptions = {
        isVertical: true,
        withScale: true,
        isRange: true,
        withTooltip: true,
      };
    });

    test('init components', () => {
      const spyClass = jest.spyOn(CssClassUtil, 'initClass');
      const spyBody = jest.spyOn(Body.prototype, 'buildHtml');
      const spyScale = jest.spyOn(Scale.prototype, 'buildHtml');
      const spyScaleLines = jest.spyOn(Scale.prototype, 'updateLines');
      const spyObserver = jest.spyOn(Observer.prototype, 'subscribe');
      view.render(html, boolOptions, points, 5, 300);
      expect(spyClass).toBeCalled();
      expect(spyBody).toBeCalled();
      expect(spyObserver).toBeCalled();
      expect(spyScale).toBeCalled();
      expect(spyScaleLines).toBeCalled();
    });
    test('tooltips hiding when off', () => {
      const spyTooltip = jest.spyOn(Body.prototype, 'toggleTooltip');
      boolOptions.withTooltip = false;
      view.render(html, boolOptions, points, 2, 100);
      expect(spyTooltip).toBeCalled();
    });
    test('toggle range when range off', () => {
      const spyRange = jest.spyOn(Body.prototype, 'toggleRange');
      boolOptions.isRange = false;
      view.render(html, boolOptions, points, 2, 100);
      expect(spyRange).toBeCalled();
    });
    test('scale hiding when off', () => {
      const spyScale = jest.spyOn(Scale.prototype, 'toggleHidden');
      boolOptions.withScale = false;
      view.render(html, boolOptions, points, 2, 100);
      expect(spyScale).toBeCalled();
    });
  });
  describe('toggles for rendered', () => {
    beforeEach(() => {
      view.render(document.createElement('div'), {
        isVertical: true,
        withScale: true,
        isRange: true,
        withTooltip: true,
      }, {
        max: { percent: 20, tooltip: 30 },
        min: { percent: 10, tooltip: 20 },
      }, 3, 200);
    });
    test('toggleRange', () => {
      const spy = jest.spyOn(Body.prototype, 'toggleRange');
      view.toggleRange();
      expect(spy).toBeCalled();
    });
    test('toggleTooltip', () => {
      const spy = jest.spyOn(Body.prototype, 'toggleTooltip');
      view.toggleTooltip();
      expect(spy).toBeCalled();
    });
    test('toggleScale', () => {
      const spy = jest.spyOn(Scale.prototype, 'toggleHidden');
      view.toggleScale();
      expect(spy).toBeCalled();
    });
    test('toggleOrientation', () => {
      const spyClass = jest.spyOn(CssClassUtil, 'toggleOrientation');
      const spyBody = jest.spyOn(Body.prototype, 'toggleOrientation');
      const spyScale = jest.spyOn(Scale.prototype, 'toggleOrientation');
      view.toggleOrientation();
      expect(spyClass).toBeCalled();
      expect(spyBody).toBeCalled();
      expect(spyScale).toBeCalled();
    });
    test('updateScaleLines', () => {
      const spy = jest.spyOn(Scale.prototype, 'updateLines');
      view.updateScaleLines(4, 321, true);
      expect(spy).toBeCalled();
    });
    test('updatePosition', () => {
      const spy = jest.spyOn(Body.prototype, 'updatePosition');
      view.updatePosition(true, { min: { percent: 20 } });
      expect(spy).toBeCalled();
    });
  });
});

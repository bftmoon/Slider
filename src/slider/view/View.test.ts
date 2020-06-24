import CssClassUtil from 'utils/CssClassUtil';
import Body from 'body/Body';
import Scale from 'scale/Scale';
import ViewOptions from 'types/ViewOptions';
import View from './View';

jest.mock('./scale/Scale');
jest.mock('./body/Body');

describe('DefaultView class', () => {
  let view: View;
  const options = {
    element: document.createElement('div'),
    isVertical: true,
    withScale: true,
    isRange: true,
    withTooltip: true,
    step: 2,
    size: 300,
    points: {
      max: {percent: 20, tooltip: 30},
      min: {percent: 10, tooltip: 20},
    }
  };
  beforeEach(() => {
    view = new View();
  });
  describe('render', () => {
    let tempOptions: ViewOptions;
    beforeEach(() => {
      tempOptions = {...options};
    });

    test('init components', () => {
      const spyClass = jest.spyOn(CssClassUtil, 'initClass');
      const spyBody = jest.spyOn(Body.prototype, 'buildHtml');
      const spyScale = jest.spyOn(Scale.prototype, 'buildHtml');
      const spyScaleLines = jest.spyOn(Scale.prototype, 'updateLines');
      const spyObserver = jest.spyOn(Body.prototype, 'subscribe');
      view.render(options);
      expect(spyClass).toBeCalled();
      expect(spyBody).toBeCalled();
      expect(spyObserver).toBeCalled();
      expect(spyScale).toBeCalled();
      expect(spyScaleLines).toBeCalled();
    });
    test('tooltips hiding when off', () => {
      const spyTooltip = jest.spyOn(Body.prototype, 'toggleTooltip');
      options.withTooltip = false;
      view.render(options);
      expect(spyTooltip).toBeCalled();
    });
    test('toggle range when range off', () => {
      const spyRange = jest.spyOn(Body.prototype, 'toggleRange');
      options.isRange = false;
      view.render(options);
      expect(spyRange).toBeCalled();
    });
    test('scale hiding when off', () => {
      const spyScale = jest.spyOn(Scale.prototype, 'toggleHidden');
      options.withScale = false;
      view.render(options);
      expect(spyScale).toBeCalled();
    });
  });

  describe('toggles for rendered', () => {
    beforeEach(() => {
        view.render({...options, element: document.createElement('div')})
      }
    );
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
      view.updatePosition(true, {min: {percent: 20}});
      expect(spy).toBeCalled();
    });
  });

});

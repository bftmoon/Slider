import Body from '../body/Body';
import CssClassUtil from '../../utils/CssClassUtil';
import Point from '../point/Point';
import Range from '../range/Range';

describe('Body class', () => {
  let body: Body;
  beforeEach(() => {
    body = new Body();
  });
  describe('buildHtml', () => {
    test('return prepared element', () => {
      const spyClass = jest.spyOn(CssClassUtil, 'initClass');
      const spyPoint = jest.spyOn(Point.prototype, 'buildHtml');
      const spyPointObserver = jest.spyOn(Point.prototype, 'subscribe');
      const spyRange = jest.spyOn(Range.prototype, 'buildHtml');
      const html = body.buildHtml(true);
      expect(spyClass).toBeCalled();
      expect(spyPoint).toBeCalledTimes(2);
      expect(spyPointObserver).toBeCalled();
      expect(spyRange).toBeCalledTimes(1);
      expect(html).toBeDefined();
    });
  });

  describe('with created html', () => {
    beforeEach(() => {
      body.buildHtml(true);
      // jest.resetAllMocks();
    });
    test('toggleOrientation', () => {
      const spyClass = jest.spyOn(CssClassUtil, 'toggleOrientation');
      const spyPoint = jest.spyOn(Point.prototype, 'toggleOrientation');
      const spyRange = jest.spyOn(Range.prototype, 'toggleOrientation');
      body.toggleOrientation();
      expect(spyRange).toBeCalled();
      expect(spyPoint).toBeCalled();
      expect(spyClass).toBeCalled();
    });
    test('toggleTooltip', () => {
      const spyPoint = jest.spyOn(Point.prototype, 'toggleTooltip');
      body.toggleTooltip();
      expect(spyPoint).toBeCalledTimes(2);
    });
    test('toggleRange', () => {
      const spyPoint = jest.spyOn(Point.prototype, 'toggleHidden');
      body.toggleRange();
      expect(spyPoint).toBeCalledTimes(1);
    });
    test('updatePosition', () => {
      const spyPoint = jest.spyOn(Point.prototype, 'updatePosition');
      const spyRange = jest.spyOn(Range.prototype, 'updatePosition');
      body.updatePosition(true, { min: { percent: 10 } });
      expect(spyPoint).toBeCalledTimes(1);
      expect(spyRange).toBeCalledTimes(1);
      body.updatePosition(true, { min: { percent: 2 }, max: { percent: 20 } });
      expect(spyRange).toBeCalledTimes(2);
      expect(spyPoint).toBeCalledTimes(3);
    });
  });
});

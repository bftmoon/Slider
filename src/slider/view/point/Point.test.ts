import Point from "./Point";
import Tooltip from "../tooltip/Tooltip";
import CssClassUtil from "../utils/CssClassUtil";
import SliderEvent from "../../observer/SliderEvent";

describe('Point class', () => {
  let point: Point;

  beforeEach(() => {
    point = new Point();
  })

  test('buildHtml return prepared element', () => {
    const mockTooltip = jest.spyOn(Tooltip.prototype, 'buildHtml');
    const mockUtil = jest.spyOn(CssClassUtil, 'initClass');
    point.buildHtml(true);
    expect(point.getElement()).toBeDefined();
    expect(mockTooltip).toBeCalled();
    expect(mockUtil).toBeCalled();
  });

  describe('functions for built html', () => {
    beforeEach(() => {
      point.buildHtml(false);
    })

    test('getElement', () => {
      expect(point.getElement()).toBeDefined();
    });

    test('toggleHidden call hidden changes', () => {
      const spy = jest.spyOn(CssClassUtil, 'toggleHidden');
      point.toggleHidden();
      expect(spy).toBeCalledTimes(1);
    });

    test('toggleOrientation call orientation changes and clean styles', () => {
      const spy = jest.spyOn(CssClassUtil, 'toggleOrientation');
      const spyTooltip = jest.spyOn(Tooltip.prototype, 'toggleOrientation');
      point.toggleOrientation();
      expect(spy).toBeCalled();
      expect(spyTooltip).toBeCalledTimes(1);
      expect(point.getElement().style.length).toBe(0);
    });

    test('handleMouseMove notify about changes', () => {
      point.subscribe(SliderEvent.pointMove, (data) => {
        expect(data).toEqual({x: 1, y: 2})
      });
      const event = new MouseEvent('mousemove', {clientX: 1, clientY: 2});
      point.getElement().dispatchEvent(event);
    })

    describe('updatePosition', ()=>{
      beforeEach(()=>{
        Object.defineProperty(point.getElement(), 'offsetWidth', {value: 10});
      });

      test('update vertical without tooltip', ()=>{
        const spy = jest.spyOn(Tooltip.prototype, 'update');
        point.updatePosition(true, {percent: 10}, {height: 100, width: 10});
        expect(spy).not.toBeCalled();
        expect(point.getElement().style.bottom).toBe('5%')
      });

      test('update horizontal and tooltip', ()=>{
        const spy = jest.spyOn(Tooltip.prototype, 'update'); // not parallel required
        point.updatePosition(false, {percent: 10, tooltip: 10}, {width: 100, height: 10});
        expect(spy).toBeCalledTimes(1);
        expect(point.getElement().style.left).toBe('5%')
      });
    });
  });
});

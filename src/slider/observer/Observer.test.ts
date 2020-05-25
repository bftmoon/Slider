import Observer from "./Observer";
import SliderEvent from "./SliderEvent";

describe('Observer class', () => {
  let observer: Observer;

  beforeEach(() => {
    observer = new Observer();
  });

  test('One subscriber call', () => {
    const mockCallback = jest.fn();
    observer.subscribe(SliderEvent.valueChanged, mockCallback);
    observer.notify(SliderEvent.valueChanged);
    expect(mockCallback).toBeCalled();
  });

  test('Many subscriber call', () => {
    const mockCallback = jest.fn();
    observer.subscribe(SliderEvent.valueChanged, mockCallback);
    observer.subscribe(SliderEvent.valueChanged, mockCallback);
    observer.subscribe(SliderEvent.valueChanged, mockCallback);
    observer.notify(SliderEvent.valueChanged);
    expect(mockCallback).toBeCalledTimes(3);
  });
})

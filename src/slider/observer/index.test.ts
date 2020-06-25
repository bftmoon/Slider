
import { SliderEvent } from 'support/enums';

import Observer from './index';

describe('Observer class', () => {
  let observer: Observer;

  beforeEach(() => {
    observer = new Observer();
  });

  test('One subscriber call', () => {
    const mockCallback = jest.fn();
    observer.subscribe(SliderEvent.ValueChanged, mockCallback);
    observer.notify(SliderEvent.ValueChanged);
    expect(mockCallback).toBeCalled();
  });

  test('Many subscriber call', () => {
    const mockCallback = jest.fn();
    observer.subscribe(SliderEvent.ValueChanged, mockCallback);
    observer.subscribe(SliderEvent.ValueChanged, mockCallback);
    observer.subscribe(SliderEvent.ValueChanged, mockCallback);
    observer.notify(SliderEvent.ValueChanged);
    expect(mockCallback).toBeCalledTimes(3);
  });
});

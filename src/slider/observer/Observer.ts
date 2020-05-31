import SliderEvent from './SliderEvent';
import IObserver from "./IObserver";

class Observer implements IObserver {
  private events = new Map<SliderEvent, ((data?: any) => void)[]>();

  subscribe(event: SliderEvent, callback: (data?: any) => void):Observer {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    return this;
  }

  notify(event: SliderEvent, data?: any) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(((callback) => {
        callback(data);
      }));
    }
  }
}

export default Observer;

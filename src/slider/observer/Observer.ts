import SliderEvent from './SliderEvent';

class Observer {
  private events = new Map<SliderEvent,((data?: any) => void)[]>();

  subscribe(event: SliderEvent, callback: (data?: any) => void) {
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

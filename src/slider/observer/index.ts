import { SliderEvent } from 'support/enums';
import { NotifyCallback } from 'support/types';


class Observer {
  private events = new Map<SliderEvent, NotifyCallback[]>();

  subscribe(event: SliderEvent, callback: NotifyCallback): Observer {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    return this;
  }

  notify(event: SliderEvent, data?: any) {
    if (this.events.has(event)) {
      this.events.get(event).forEach((callback) => {
        callback(data);
      });
    }
  }
}

export default Observer;

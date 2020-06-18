import SliderEvent from './SliderEvent';

interface Observable {
  subscribe(event: SliderEvent, callback: (data?: any) => void): Observable;

  notify(event: SliderEvent, data?: any): void;
}

export default Observable;

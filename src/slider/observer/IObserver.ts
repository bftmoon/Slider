import SliderEvent from './SliderEvent';

interface IObserver {
  subscribe(event: SliderEvent, callback: (data?: any) => void): IObserver;

  notify(event: SliderEvent, data?: any): void;
}

export default IObserver;

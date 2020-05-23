import './index.scss'
import './theme.scss'
import '../slider/slider.scss'
import Slider from "../slider/Slider";
import IModel from "../slider/model/IModel";

$('.js-example__slider_vertical').each((index, el) => {
  new Slider({...optionsGenerator(index), isVertical: true}).init(el as HTMLDivElement);
})
$('.js-example__slider').each((index, el) => {
  new Slider(optionsGenerator(index)).init(el as HTMLDivElement);
})
$('.js-example__slider_long').each((index, el) => {
  new Slider().init(el as HTMLDivElement);
})
$('.js-example__slider_long_and_big').each((index, el) => {
  new Slider({
    border: {
      min: 0,
      max: 1000000000000
    },
    current: {
      min: 1000000,
      max: 700000000000
    },
    linesCount:{max: 250}
  }).init(el as HTMLDivElement);
})

// todo: visible current

function optionsGenerator(index: number): IModel {
  const option: IModel = {
    isRange: index > 0,
    withTooltip: index > 1,
    withScale: index > 2,
    step: index > 3 ? 5 : 1
  }
  if (index === 5) {
    option.border = {min: 7, max: 345};
    option.current = {min: 23, max: 210};
  }
  if (index === 6) {
    option.border = {min: 0, max: 1000000};
    option.current = {min: 23, max: 600000};
  }
  return option;
}

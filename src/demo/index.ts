import './index.scss'
import './theme.scss'
import '../slider/slider.scss'
import Slider from "../slider/Slider";

new Slider({isRange: false, withTooltip: false, withScale: false}).init(document.querySelector('.js-example__slider'));
new Slider({withScale:false}).init(document.querySelector('.js-example__slider_ranged'));
new Slider({isVertical: true}).init(document.querySelector('.js-example__slider_vertical'));

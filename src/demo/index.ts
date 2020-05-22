import './index.scss'
import './theme.scss'
import '../slider/slider.scss'
import Slider from "../slider/Slider";

$('.js-example__slider_vertical').each((index, el) => {
    new Slider({
        isVertical: true,
        isRange: index > 0,
        withTooltip: index > 1,
        withScale: index > 2,
        step: index > 3 ? 5 : 1
    }).init(el as HTMLDivElement);
})
$('.js-example__slider').each((index, el) => {
    new Slider({
        isRange: index > 0, withTooltip: index > 1, withScale: index > 2, step: index > 3 ? 5 : 1
    }).init(el as HTMLDivElement);
})
$('.js-example__slider_long').each((index, el) => {
    new Slider().init(el as HTMLDivElement);
})

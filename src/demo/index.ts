import './index.scss'
import './theme.scss'
import '../slider/slider.scss'
import Slider from "../slider/Slider";
import IModel, {IOptions} from "../slider/model/IModel";

$('.js-example__slider_vertical').each((index, el) => {
    new Slider({...optionsGenerator(index), isVertical:true}).init(el as HTMLDivElement);
})
$('.js-example__slider').each((index, el) => {
    new Slider(optionsGenerator(index)).init(el as HTMLDivElement);
})
$('.js-example__slider_long').each((index, el) => {
    new Slider().init(el as HTMLDivElement);
})

function optionsGenerator(index: number):IModel{
    const option: IModel = {
        isRange: index > 0,
        withTooltip: index > 1,
        withScale: index > 2,
        step: index > 3 ? 5 : 1
    }
    if (index>4){
        option.min = 7;
        option.max = 345;
        option.current = {min: 23, max: 210};
    }
    return option;
}

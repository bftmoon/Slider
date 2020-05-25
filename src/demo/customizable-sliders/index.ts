import '../theme.scss'
import './customizable-sliders.scss'
import './panel/panel.scss'
import '../../slider/slider.scss'
import Panel from "./panel/Panel";

$('.js-example-custom__container').each((index, element)=>{
  new Panel().init({panelElement: element.firstElementChild as HTMLElement, sliderElement: element.lastChild as HTMLElement})
})
// new Panel()

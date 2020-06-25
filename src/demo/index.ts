import 'index';

import './theme.scss';
import './demo.scss';
import './panel/panel.scss';
import Panel from './panel/index';

$('.js-demo__container').each((index, element) => {
  new Panel(
    $(element)
      .find('.js-demo__slider')
      .slider({
        current: { max: 90 },
        isRange: index !== 0,
        withScale: index !== 0,
        isVertical: index === 2,
      }),
  ).init(element.firstElementChild as HTMLElement);
});

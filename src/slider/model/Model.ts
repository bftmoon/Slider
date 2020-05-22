import IOptions from "./IOptions";

class Model implements IOptions{
    min = 0;
    max = 100;
    current = {min: 30, max: 80};
    step = 1;
    isRange = true;
    isVertical = false;
    withTooltip = true;
    linesCount={min: 2, max: 30}
    withScale=true;

    constructor(options?: IOptions) {
        if (options) {
            for (let key in options) {
                if (key === 'current' || key === 'linesCount'){
                    if (options[key].max) this[key].max = options[key].max;
                    if (options[key].min) this[key].min = options[key].min;
                } else {
                    // @ts-ignore
                    this[key] = options[key];
                }
            }
        }
    }
}

export default Model;

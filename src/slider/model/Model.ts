import IOptions from "./IOptions";

class Model {
    options: IOptions = {
        min: 0,
        max: 100,
        current: [20, 80],
        step: 1,
        isRange: true,
        isVertical: false,
        withTooltip: true,
        withScale: true,
        scaleLinesCount: 10
    }


    constructor(options?: IOptions) {
        if (options) {
            for (let key in options) {
                // @ts-ignore
                this.options[key] = options[key];
            }
        }
    }

// current: number;
    // currentRanged: number;
    // max: number;
    // min: number;
    // step: number;
    // isRange: boolean;
    // isVertical: boolean;
    // withScale: boolean;
    // withTooltip: boolean;
    //
    // constructor(options: IOptions) {
    //     this.min = options.min || 0;
    //     this.max = options.max || 100;
    //     this.step = options.step || 1;
    //     this.current = options.current || 0;
    //     this.currentRanged = options.currentRanged || 0;
    //     this.isRange = options.isRange;
    //     this.isVertical = options.isVertical;
    //     this.withScale = options.withScale;
    //     this.withTooltip = options.withTooltip;
    // }
}

export default Model;

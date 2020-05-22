class Validator {
    static isPositiveRange(min: number, max: number) {
        if (max < min) {
            throw new SliderError(`Negative range: min - ${min}, max - ${max}`);
        }
    }

    static isInRange(min: number, max: number, current: number) {
        if (current < min || current > max) {
            throw new SliderError(`Not in range: ${current}`);
        }
    }

    static isRangeActive(isRange: boolean) {
        if (!isRange) {
            throw new SliderError('Setting ranged value for not ranged slider');
        }
    }
    static isStepInRange(step: number, min: number, max: number){
        if (max - min < step){
            throw new SliderError('Too big step size: ' + step)
        }
    }
}

class SliderError extends Error {
}

export default Validator;

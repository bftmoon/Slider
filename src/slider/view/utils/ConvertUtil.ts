class ConvertUtil {
  static toPercent(value: number, size: number) {
    return 100 * (value / size);
  }

  static fromPercent(percent: number, size: number) {
    return size * (percent / 100);
  }

  static toPercentWithDiff(value: number, begin: number, end: number) {
    return ConvertUtil.toPercent(value - begin, end - begin);
  }

  static fromPercentWithDiff(value: number, begin: number, end: number) {
    return ConvertUtil.fromPercent(value, end - begin) + begin;
  }
}

export default ConvertUtil;

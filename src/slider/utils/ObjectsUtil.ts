class ObjectsUtil {
  static update<T>(main: T, inject: T) {
    const result = {};
    Object.keys(main).forEach((key) => {
      // @ts-ignore
      if (ObjectsUtil.isNotArrayOrPrimitive(key, main)) {
        // @ts-ignore
        result[key] = ObjectsUtil.update(main[key], inject[key]);
      } else {
        // @ts-ignore
        result[key] = inject?.hasOwnProperty(key) ? inject[key] : main[key];
      }
    });
    return result;
  }

  private static isNotArrayOrPrimitive(key: string, object: Object) {
    // @ts-ignore
    return typeof object[key] === 'object' && !Array.isArray(object[key]);
  }
}

export default ObjectsUtil;

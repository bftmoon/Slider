class ObjectsUtil {
  static update<T>(main: T, inject: T) {
    type K = keyof T;
    const result = { ...main };
    Object.keys(main).map((key) => key as K).forEach((key) => {
      if (ObjectsUtil.isDeepUpdateRequired(inject[key])) {
        result[key] = ObjectsUtil.update(main[key], inject[key]);
      } else {
        result[key] = inject[key] !== undefined ? inject[key] : main[key];
      }
    });
    return result;
  }

  private static isDeepUpdateRequired(value: any) {
    return typeof value === 'object' && !Array.isArray(value) && value != null;
  }
}

export default ObjectsUtil;

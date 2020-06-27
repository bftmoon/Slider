import ObjectsUtil from './ObjectsUtil';

describe('ObjectsUtil class', () => {
  type TestType = {
    saved?: number,
    changed?: number,
    undef?: {saved?: number},
    null?: {removed?: number},
    deep?:{
      saved?: number,
      changed?: number,
      mas?: string[],
      deeper?: {saved?: number, changed?: number}
    }
  }

  test('update', () => {
    const updated = ObjectsUtil.update<TestType>(
      {
        saved: 0,
        changed: 1,
        undef: { saved: 9 },
        null: { removed: 10 },
        deep: {
          saved: 2,
          changed: 3,
          mas: ['a', 'b', 'c'],
          deeper: {
            saved: 4,
            changed: 5,
          },
        },
      },
      {
        changed: 6,
        undef: undefined,
        null: null,
        deep: {
          changed: 7,
          mas: ['k', 'l'],
          deeper: {
            changed: 8,
          },
        },
      },
    );
    expect(updated).toEqual(
      {
        saved: 0,
        changed: 6,
        undef: { saved: 9 },
        null: null,
        deep: {
          saved: 2,
          changed: 7,
          mas: ['k', 'l'],
          deeper: {
            saved: 4,
            changed: 8,
          },
        },
      } as TestType,
    );
  });
});
